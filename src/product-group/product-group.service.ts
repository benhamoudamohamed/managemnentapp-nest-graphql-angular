import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductGroupInput } from './dto/create-product-group.input';
import { UpdateProductGroupInput } from './dto/update-product-group.input';
import { ProductGroup } from './entities/product-group.entity';

@Injectable()
export class ProductGroupService {
  constructor(
    @InjectRepository(ProductGroup)
    private productGroupRepository: Repository<ProductGroup>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private userRepository: Repository<User>) { }

  async findAll(): Promise<ProductGroup[]> {
    return await this.productGroupRepository.find();
  }

  async findProductGroupByUser(userId: string): Promise<ProductGroup[]> {
    const user = await this.userRepository.findOne({where: {id: userId} });
    return await this.productGroupRepository.find({user: user});
  }

  async findByCompany(companyId: string): Promise<ProductGroup[]> {
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    return await this.productGroupRepository.find({company: company});
  }

  async findOne(id: string): Promise<ProductGroup>  {
    const productGroup = await this.productGroupRepository.findOne(id);
    if(!productGroup) {
      throw new UnauthorizedException('productGroup not found');
    }
    return productGroup;
  }

  async create(userId: string, data: CreateProductGroupInput, companyId: string): Promise<ProductGroup> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['companies']});
    const company = await this.companyRepository.findOne({where: {id: companyId} });

    const { name } = data;
    user.companies.forEach(res => {
      if(res.id === company.id) {
        if(company.productGroups.length !== 0) {
          company.productGroups.forEach(val => {
            if(val.name === name) {
              throw new ConflictException('productGroup name already exists')
            }
          })
        } else {
          return true
        }
      }
    })
     
    const productGroup = this.productGroupRepository.create({...data, company: company, user: user});  

    try {
      return await this.productGroupRepository.save(productGroup);
    } catch(error) {
      if(error.code === 'ER_DUP_ENTRY' || error.response.statusCode === 409) {
        throw new ConflictException('productGroup already exists')
      } else {
        throw new InternalServerErrorException()
      } 
    }
  }

  async update(userId: string, id: string, data: UpdateProductGroupInput, companyId: string): Promise<ProductGroup> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['companies'] });
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    let productGroup = await this.productGroupRepository.findOne({ where: {id}});
    if(!productGroup) {
      throw new UnauthorizedException('productGroup not found');
    }

    const { name } = data;
    user.companies.forEach(res => {
      if(res.id === company.id) {
        if(company.productGroups.length !== 0) {
          company.productGroups.forEach(val => {
            if(val.name === name) {
              throw new ConflictException('productGroup name already exists')
            }
          })
        } else {
          return true
        }
      }
    })

    // const allproductGroups = await this.productGroupRepository.find({relations: ['user']})
    // const { name, image } = data;

    // allproductGroups.filter(function(val) {
    //   if(val.id === user.id) {
    //     val.user.productGroups.forEach(res => {
    //       if(res.name === name) {
    //         throw new ConflictException('productGroup name already exists')
    //       }
    //     })
    //     return val.user;
    //   }
    // });

    await this.productGroupRepository.update({ id }, {... data, company: company});
    productGroup = await this.productGroupRepository.findOne({ where: {id}});
    return productGroup;
  }

  async delete(id: string): Promise<ProductGroup> {
    const productGroup: any = await this.productGroupRepository.findOne({ where: {id}});
    if(!productGroup) {
      throw new UnauthorizedException('productGroup not found');
    }
    await this.productGroupRepository.delete(id);
    return productGroup
  }
}
