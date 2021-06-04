import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProviderInput } from './dto/create-provider.input';
import { UpdateProviderInput } from './dto/update-provider.input';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    @InjectRepository(User)
    private userRepository: Repository<User>) { }

  async findAll(): Promise<Provider[]> {
    return await this.providerRepository.find();
  }

  async findByCompany(companyId: string): Promise<Provider[]> {
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    return await this.providerRepository.find({company: company});
  }

  async findOne(id: string): Promise<Provider>  {
    const provider = await this.providerRepository.findOne(id);
    if(!provider) {
      throw new UnauthorizedException('provider not found');
    }
    return provider;
  }

  async create(userId: string, data: CreateProviderInput, companyId: string): Promise<Provider> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['companies'] });
    const company = await this.companyRepository.findOne({where: {id: companyId} });

    const { name } = data;
    user.companies.forEach(res => {
      if(res.id === company.id) {
        if(company.providers.length !== 0) {
          company.providers.forEach(val => {
            if(val.name === name) {
              throw new ConflictException('provider name already exists')
            }
          })
        } else {
          return true
        }
      }
    })
    
    const provider = this.providerRepository.create({...data, company: company, user: user});  

    try {
      return await this.providerRepository.save(provider);
    } catch(error) {
      if(error.code === 'ER_DUP_ENTRY' || error.response.statusCode === 409) {
        throw new ConflictException('provider already exists')
      } else {
        throw new InternalServerErrorException()
      } 
    }
  }

  async update(userId: string, id: string, data: UpdateProviderInput, companyId: string): Promise<Provider> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['companies']});
    const company = await this.companyRepository.findOne({where: {id: companyId} });

    let provider = await this.providerRepository.findOne({ where: {id}});
    if(!provider) {
      throw new UnauthorizedException('provider not found');
    }

    const { name } = data; 
    user.companies.forEach(res => {
      if(res.id === company.id) {
        if(company.providers.length !== 0) {
          company.providers.forEach(val => {
            if(val.name === name) {
              throw new ConflictException('provider name already exists')
            }
          })
        } else {
          return true
        }
      }
    })

    await this.providerRepository.update({ id }, {...data, company: company, user: user});
    provider = await this.providerRepository.findOne({ where: {id}});
    return provider;
  }

  async delete(id: string): Promise<Provider> {
    const provider: any = await this.providerRepository.findOne({ where: {id}});
    if(!provider) {
      throw new UnauthorizedException('provider not found');
    }
    await this.providerRepository.delete(id);
    return provider;
  }
}
