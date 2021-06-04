import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CompanyType } from 'src/company/dto/company.input';
import { Company } from 'src/company/entities/company.entity';
import { CustomerType } from 'src/customer/dto/customer.type';
import { Customer } from 'src/customer/entities/customer.entity';
import { InvoiceType } from 'src/invoice/dto/invoice.input';
import { ProductGroupType } from 'src/product-group/dto/productGroup.type';
import { ProductGroup } from 'src/product-group/entities/product-group.entity';
import { ProductType } from 'src/product/dto/product.input';
import { Product } from 'src/product/entities/product.entity';
import { ProviderType } from 'src/provider/dto/provider.input';
import { Provider } from 'src/provider/entities/provider.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { UserRole } from '../shared/role.enum';
import { Status } from '../shared/status.enum';

@ObjectType('User')
export class UserType {
  @Field(type => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  token: string;

  @Field(type => UserRole)
  userRole: UserRole;

  @Field(type => Status)
  status: Status;

  @Field()
  created: Date;

  @Field(type => [CompanyType])
  companies: Company[];

  @Field(type => [ProductGroupType])
  productGroups: ProductGroup[];

  @Field(type => [ProductType])
  products: Product[];

  @Field(type => [CustomerType])
  customers: Customer[];

  @Field(type => [ProviderType])
  providers: Provider[];

  @Field(type => [InvoiceType])
  invoices: Invoice[];
}