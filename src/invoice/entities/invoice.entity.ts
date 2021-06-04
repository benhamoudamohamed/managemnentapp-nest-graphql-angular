import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column("integer")
  quantity: number;

  @Column("float")
  sellingPriceTTC: number;

  @Column("float")
  total: number;

  @Column("float")
  subamount: number;

  @Column("float")
  discount: number;

  @Column("float")
  totalAfterDiscount: number;

  @Column("float")
  stamp: number;

  @Column("float")
  totalAmount: number;

  // @Column()
  // savingAsDraft: boolean;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, user => user.invoices, {eager: false})
  user: User;

  @ManyToOne(type => Company, company => company.invoices, {eager: false})
  company: Company;

  @ManyToOne(type => Customer, customer => customer.invoices, {eager: true})
  customer: Customer;

  @ManyToOne(type => Product, product => product.invoices, {eager: true})
  product: Product;
}
