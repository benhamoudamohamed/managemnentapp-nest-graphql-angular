import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Customer extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  address: string;

  @Column("integer")
  mobile: number;

  @Column("integer")
  fax: number;

  @Column()
  email: string;

  @Column("float")
  discountRate: number;

  @Column()
  customerCompany: string;

  @Column()
  matriculeFiscal: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, user => user.customers, {eager: false})
  user: User;

  @ManyToOne(type => Company, company => company.customers, {eager: false})
  company: Company;

  @OneToMany(type => Invoice, invoice => invoice.customer, {eager: false})
  invoices: Invoice[];
}
