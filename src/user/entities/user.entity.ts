import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { Admin } from '../../admin/entities/admin.entity';
import { ProductGroup } from 'src/product-group/entities/product-group.entity';
import { Product } from 'src/product/entities/product.entity';
import { Company } from '../../company/entities/company.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { UserRole } from '../shared/role.enum';
import { Status } from '../shared/status.enum';

@Entity()
@Unique(['username'])
export class User extends BaseEntity  {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    default: UserRole.Admin,
    enum: UserRole,
    type: 'enum',
  })
  userRole: UserRole;

  @Column({
    default: Status.Pending,
    enum: Status,
    type: 'enum',
  })
  status: Status;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  created: Date;

  // @ManyToOne(type => Admin, admin => admin.users, {eager: false})
  // admin: Admin;

  @OneToMany(type => Company, company => company.user, {eager: true, cascade: true})
  companies: Company[];

  @OneToMany(type => ProductGroup, productGroup => productGroup.user, {eager: true, cascade: true})
  productGroups: ProductGroup[];

  @OneToMany(type => Product, product => product.user, {eager: true, cascade: true})
  products: Product[];

  @OneToMany(type => Unit, unit => unit.user, {eager: true, cascade: true})
  units: Unit[];

  @OneToMany(type => Customer, customer => customer.user, {eager: true, cascade: true})
  customers: Customer[];

  @OneToMany(type => Provider, provider => provider.user, {eager: true, cascade: true})
  providers: Provider[];

  @OneToMany(type => Invoice, invoice => invoice.user, {eager: true, cascade: true})
  invoices: Invoice[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password;
  }

  // private get token() {
  //   const { id, username, userRole } = this;   
  //   return jwt.sign({ id, username, userRole }, 'topSecret', {expiresIn: '7d'});
  // }
}