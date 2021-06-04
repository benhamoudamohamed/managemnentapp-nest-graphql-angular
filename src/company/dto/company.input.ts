import { Provider } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CustomerType } from 'src/customer/dto/customer.type';
import { Customer } from 'src/customer/entities/customer.entity';
import { ProductGroupType } from 'src/product-group/dto/productGroup.type';
import { ProductGroup } from 'src/product-group/entities/product-group.entity';
import { ProductType } from 'src/product/dto/product.input';
import { Product } from 'src/product/entities/product.entity';
import { ProviderType } from 'src/provider/dto/provider.input';
import { UnitType } from 'src/unit/dto/unit.input';
import { Unit } from 'src/unit/entities/unit.entity';

@ObjectType('Company')
export class CompanyType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  matriculeFiscal: string;

  @Field()
  address: string;

  @Field()
  managerName: string;

  @Field()
  managerPhone: string;

  @Field()
  managerEmail: string;

  @Field()
  image: string;

  @Field()
  created: Date;

  @Field(type => [CustomerType])
  customers: Customer[];

  @Field(type => [ProviderType])
  providers: Provider[];

  @Field(type => [ProductGroupType])
  productGroups: ProductGroup[];

  @Field(type => [ProductType])
  products: Product[];

  @Field(type => [CustomerType])
  invoices: Customer[];

  @Field(type => [UnitType])
  units: Unit[];
}
