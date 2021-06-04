import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ProductGroup } from '../../product-group/entities/product-group.entity';
import { Unit } from '../../unit/entities/unit.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Company } from 'src/company/entities/company.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  
  @Column()
  name: string;

  @Column()
  image: string;

  @Column("integer")
  stockQuantity: number;

  @Column("integer")
  minQuantity: number;

  @Column("float")
  buyingPriceHT: number;

  @Column("float")
  fodec: number;

  @Column("float")
  tva: number;

  @Column("float")
  sellingPriceNet: number;

  @Column("float")
  benificeMarge: number;

  @Column("float")
  benificeRate: number;

  @Column("float")
  sellingPriceTTC: number;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, user => user.products, {eager: false})
  user: User;

  @ManyToOne(type => Company, company => company.products, {eager: false})
  company: Company;

  @ManyToOne(type => ProductGroup, productGroup => productGroup.products, {eager: true})
  productGroup: ProductGroup;

  @ManyToOne(type => Unit, unit => unit.products, {eager: true})
  unit: Unit;

  @OneToMany(type => Invoice, invoice => invoice.product, {eager: false})
  invoices: Invoice[];
}
