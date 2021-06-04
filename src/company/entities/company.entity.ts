import { Customer } from 'src/customer/entities/customer.entity';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Unique, OneToMany } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { User } from 'src/user/entities/user.entity';
import { Provider } from '../../provider/entities/provider.entity';
import { ProductGroup } from '../../product-group/entities/product-group.entity';
import { Product } from 'src/product/entities/product.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Unit } from '../../unit/entities/unit.entity';

@Entity()
@Unique(['name'])
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  
  @Column()
  name: string;

  @Column()
  matriculeFiscal: string;

  @Column()
  address: string;

  @Column()
  managerName: string;

  @Column()
  managerPhone: string;

  @Column()
  managerEmail: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, user => user.companies, {eager: false})
  user: User;

  @OneToMany(type => Customer, customer => customer.company, {eager: true, cascade: true})
  customers: Customer[];

  @OneToMany(type => Provider, provider => provider.company, {eager: true, cascade: true})
  providers: Provider[];

  @OneToMany(type => ProductGroup, productGroup => productGroup.company, {eager: true, cascade: true})
  productGroups: ProductGroup[];

  @OneToMany(type => Product, product => product.company, {eager: true, cascade: true})
  products: Product[];

  @OneToMany(type => Invoice, invoice => invoice.company, {eager: true, cascade: true})
  invoices: Invoice[];

  @OneToMany(type => Unit, unit => unit.company, {eager: true, cascade: true})
  units: Unit[];
}
