import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './entities/customer.entity';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private userRepository: Repository<User>) { }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findByUser(userId: string): Promise<Customer[]> {
    const user = await this.userRepository.findOne({where: {id: userId} });
    return await this.customerRepository.find({user: user});
  }

  async findByCompany(companyId: string): Promise<Customer[]> {
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    return await this.customerRepository.find({company: company});
  }

  async findOne(id: string): Promise<Customer>  {
    const customer = await this.customerRepository.findOne(id);
    if(!customer) {
      throw new UnauthorizedException('customer not found');
    }
    return customer;
  }

  async create(userId: string, data: CreateCustomerInput, companyId: string): Promise<Customer> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['companies']});
    const company = await this.companyRepository.findOne({where: {id: companyId} });
   
    const { name } = data;
    user.companies.forEach(res => {
      if(res.id === company.id) {
        if(company.customers.length !== 0) {
          company.customers.forEach(val => {
            if(val.name === name) {
              throw new ConflictException('customer name already exists')
            }
          })
        } else {
          return true
        }
      }
    })

    const customer = this.customerRepository.create({...data, company: company, user: user});  

    try {
      return await this.customerRepository.save(customer);
    } catch(error) {
      console.log(error, error)
      throw new InternalServerErrorException()
      // if(error.code === 'ER_DUP_ENTRY' || error.response.statusCode === 409) {
      //   throw new ConflictException('customer already exists')
      // } else {
      //   throw new InternalServerErrorException()
      // } 
    }
  }

  async update(userId: string, id: string, data: UpdateCustomerInput, companyId: string): Promise<Customer> {
    const user = await this.userRepository.findOne({where: {id: userId} });
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    let customer = await this.customerRepository.findOne({ where: {id}});
    if(!customer) {
      throw new UnauthorizedException('customer not found');
    }

    const { name } = data;
    user.companies.forEach(res => {
      if(res.id === company.id) {
        if(company.customers.length !== 0) {
          company.customers.forEach(val => {
            if(val.name === name) {
              throw new ConflictException('customer name already exists')
            }
          })
        } else {
          return true
        }
      }
    })

    await this.customerRepository.update({ id }, {...data, company: company});
    customer = await this.customerRepository.findOne({ where: {id}});
    return customer;
  }

  async delete(id: string): Promise<Customer> {
    const customer: any = await this.customerRepository.findOne({ where: {id}});
    if(!customer) {
      throw new UnauthorizedException('customer not found');
    }
    await this.customerRepository.delete(id);
    return customer;
  }
}
