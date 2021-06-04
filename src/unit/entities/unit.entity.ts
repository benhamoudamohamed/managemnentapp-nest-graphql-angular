import { Company } from 'src/company/entities/company.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Unique, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Unit extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  
  @Column()
  name: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, user => user.units, {eager: false})
  user: User;

  @ManyToOne(type => Company, company => company.units, {eager: false})
  company: Company;

  @OneToMany(type => Product, product => product.unit, {eager: false, cascade: true})
  products: Product[];
}
