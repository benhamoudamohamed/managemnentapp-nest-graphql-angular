import { Entity, Unique, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { User } from 'src/user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['username'])
export class Admin extends BaseEntity  {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;
  
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  created: Date;

  // @OneToMany(type => User, user => user.admin, {eager: true, cascade: true})
  // users: User[];

  // @OneToMany(type => Company, company => company.admin, {eager: true, cascade: true})
  // companies: Company[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password;
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign({ id, username }, 'topSecret', {expiresIn: '7d'})
  }
}