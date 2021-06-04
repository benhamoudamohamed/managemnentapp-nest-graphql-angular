import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Admin } from '../admin/entities/admin.entity';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>) { }

  async findAll(): Promise<Company[]> {
    // return await this.companyRepository.find();

    try {
      return await this.companyRepository.find();
    } catch (error) {
      throw new UnauthorizedException('Unauthorized User');
    }
  }

  async findByAdmin(userId: string): Promise<Company[]> {
    const user = await this.userRepository.findOne({where: {id: userId} });
    return await this.companyRepository.find({user: user});
  }

  async findOne(id: string): Promise<Company>  {
    const company = await this.companyRepository.findOne(id);
    if(!company) {
      throw new UnauthorizedException('company not found');
    }
    return company;
  }

  async create(userId: string, data: CreateCompanyInput): Promise<Company> {
    const user = await this.userRepository.findOne({where: {id: userId} });
    const {name, matriculeFiscal, address, managerName, managerPhone, managerEmail, image} = data;
    const company = this.companyRepository.create({...data, user: user}); 

    try {
      return await this.companyRepository.save(company);
    } catch(error) {
      if(error.code === 'ER_DUP_ENTRY' || error.response.statusCode === 409) {
        throw new ConflictException('company already exists')
      } 
      else {
        throw new InternalServerErrorException() 
      } 
    }
  }

  async update(adminId: string, id: string, data: CreateCompanyInput): Promise<Company> {
    const admin = await this.adminRepository.findOne({where: {id: adminId} });
    const {name, matriculeFiscal, address, managerName, managerPhone, managerEmail, image} = data;

    let company = await this.companyRepository.findOne({ where: {id}});
    if(!company) {
      throw new UnauthorizedException('company not found');
    }

    try {
      await this.companyRepository.update({ id }, {...data});
      company = await this.companyRepository.findOne({ where: {id}});
      return company;
    } catch(error) {
      throw new UnauthorizedException('Unauthorized User');
    }
  }

  async delete(id: string): Promise<Company> {
    const company: any = await this.companyRepository.findOne({ where: {id}});
    if(!company) {
      throw new UnauthorizedException('company not found');
    }
    await this.companyRepository.delete(id);
    return company;
  }
}
