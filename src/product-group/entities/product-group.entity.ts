import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Unique, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class ProductGroup extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  
  @Column()
  name: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, user => user.productGroups, {eager: false})
  user: User;

  @ManyToOne(type => Company, company => company.productGroups, {eager: false})
  company: Company;
  
  @OneToMany(type => Product, product => product.productGroup, {eager: false, cascade: true})
  products: Product[];
}
