import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class AdminService {
  
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>) { }

  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.find({relations: ['users']});
  }

  async findOne(id: string): Promise<Admin>  {
    return await this.adminRepository.findOne({where: {id}});
  }

  async read(username: string)  {
    return await this.adminRepository.findOne({ where: { username } });
  }

  async signUp(input: CreateAdminInput): Promise<Admin> {
    const { firstname, lastname, username, password } = input;
    const admin = new Admin();
    admin.firstname = firstname;
    admin.lastname = lastname;
    admin.username = username;
    admin.salt = await bcrypt.genSalt();
    admin.password = await this.hashPassword(password, admin.salt);

    try {
      return await this.adminRepository.save(admin);
    } catch(error) {
      if(error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      } 
    }
  } 

  async signIn(input: CreateAdminInput): Promise<any> {
    const { username } = input;
    const admin = await this.adminRepository.findOne({ where: { username } });
    const adminPass = await this.validateUserPassword(input)
    if (!admin || !adminPass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return admin;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(input: CreateAdminInput): Promise<string>  {
    const { username, password } = input;
    const admin = await this.adminRepository.findOne({username});
    if(admin && await admin.validatePassword(password)) { 
      return admin.username;
    } else {
      return null;
    }
  }
}
