import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { ProductGroup } from 'src/product-group/entities/product-group.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductGroup)
    private productGroupRepository: Repository<ProductGroup>,
    @InjectRepository(Unit)
    private unittGroupRepository: Repository<Unit>,
    @InjectRepository(User)
    private userRepository: Repository<User>) { }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findProductByProductGroup(productGroupId: string): Promise<Product[]> {
    const productGroup = await this.productGroupRepository.findOne({where: {id: productGroupId} });
    return await this.productRepository.find({productGroup: productGroup});
  }

  async findByCompany(companyId: string): Promise<Product[]> {
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    return await this.productRepository.find({company: company});
  }

  async findOne(id: string): Promise<Product>  {
    const product = await this.productRepository.findOne(id);
    if(!product) {
      throw new UnauthorizedException('product not found');
    }
    return product;
  }

  async create(userId: string, data: CreateProductInput, productGroupId: string, unitId: string, companyId: string): Promise<Product> {
    const productGroup = await this.productGroupRepository.findOne({where: {id: productGroupId} });
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    const unit = await this.unittGroupRepository.findOne({where: {id: unitId} });
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['companies']});

    const { name } = data;
    user.companies.forEach(res => {
      if(res.id === company.id) {
        if(company.products.length !== 0) {
          company.products.forEach(val => {
            if(val.name === name) {
              throw new ConflictException('product name already exists')
            }
          })
        } else {
          return true
        }
      }
    })
    
    const product = this.productRepository.create({...data, productGroup, unit, company: company, user: user});

    try {
      return await this.productRepository.save(product);
    } catch(error) {
      if(error.code === 'ER_DUP_ENTRY' || error.response.statusCode === 409) {
        throw new ConflictException('product already exists')
      } else {
        throw new InternalServerErrorException()
      } 
    }
  }
  
  async update(userId: string, id: string, data: UpdateProductInput, productGroupId: string, unitId: string, companyId: string): Promise<Product> {
    const user = await this.userRepository.findOne({where: {id: userId} });
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    const productGroup = await this.productGroupRepository.findOne({where: {id: productGroupId} });
    const unit = await this.unittGroupRepository.findOne({where: {id: unitId} });
    let product = await this.productRepository.findOne({ where: {id}});
    if(!product) {
      throw new UnauthorizedException('product not found');
    }

    const { name } = data;
    user.companies.forEach(res => {
      if(res.id === company.id) {
        if(company.products.length !== 0) {
          company.products.forEach(val => {
            if(val.name === name) {
              throw new ConflictException('product name already exists')
            }
          })
        } else {
          return true
        }
      }
    })

    await this.productRepository.update({ id }, {...data, company: company, productGroup, unit});
    product = await this.productRepository.findOne({ where: {id}});
    return product;
  }

  async delete(id: string): Promise<Product> {
    const product: any = await this.productRepository.findOne({ where: {id}});
    if(!product) {
      throw new UnauthorizedException('product not found');
    }
    await this.productRepository.delete(id);
    return product
  }
}
