import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateUnitInput } from './dto/create-unit.input';
import { UpdateUnitInput } from './dto/update-unit.input';
import { Unit } from './entities/unit.entity';
import { User } from '../user/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>) { }

  async findAll(): Promise<Unit[]> {
    return await this.unitRepository.find();
  }

  async findByCompany(companyId: string): Promise<Unit[]> {
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    return await this.unitRepository.find({company: company});
  }

  async findOne(id: string): Promise<Unit>  {
    const unit = await this.unitRepository.findOne(id);
    if(!unit) {
      throw new UnauthorizedException('unit not found');
    }
    return unit;
  }

  async create(userId: string, data: CreateUnitInput, companyId: string): Promise<Unit> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['companies']});
    const company = await this.companyRepository.findOne({where: {id: companyId} });

    const { name } = data;
    user.companies.forEach(res => {
      if(res.id === company.id) {
        if(company.units.length !== 0) {
          company.units.forEach(val => {
            if(val.name === name) {
              throw new ConflictException('unit name already exists')
            }
          })
        } else {
          return true
        }
      }
    })

    const unit = this.unitRepository.create({...data, company: company, user: user});  

    try {
      return await this.unitRepository.save(unit);
    } catch(error) {
      console.log(error)
      throw new InternalServerErrorException()

      // if(error.code === 'ER_DUP_ENTRY' || error.response.statusCode === 409) {
      //   throw new ConflictException('units already exists')
      // } else {
      //   throw new InternalServerErrorException()
      // } 
    }
  }

  async update(userId: string, id: string, data: UpdateUnitInput, companyId: string): Promise<Unit> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['companies']});
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    let unit = await this.unitRepository.findOne({ where: {id}});
    if(!unit) {
      throw new UnauthorizedException('unit not found');
    }

    const { name } = data;
    user.companies.forEach(res => {
      if(res.id === company.id) {
        if(company.units.length !== 0) {
          company.units.forEach(val => {
            if(val.name === name) {
              throw new ConflictException('unit name already exists')
            }
          })
        } else {
          return true
        }
      }
    })

    await this.unitRepository.update({ id }, {...data, company: company});
    unit = await this.unitRepository.findOne({ where: {id}});
    return unit;
  }

  async delete(id: string): Promise<Unit> {
    const unit: any = await this.unitRepository.findOne({ where: {id}});
    if(!unit) {
      throw new UnauthorizedException('unit not found');
    }
    await this.unitRepository.delete(id);
    return unit;
  }
}
