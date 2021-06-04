import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductType } from 'src/product/dto/product.input';
import { Product } from '../../product/entities/product.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { CustomerType } from 'src/customer/dto/customer.type';

@ObjectType('Invoice')
export class InvoiceType {
  @Field(type => ID)
  id: string;

  @Field()
  quantity: number;

  @Field()
  sellingPriceTTC: number;

  @Field()
  total: number;

  @Field()
  subamount: number;

  @Field()
  discount: number;

  @Field()
  totalAfterDiscount: number;

  @Field()
  stamp: number;

  @Field()
  totalAmount: number;

  // @Field()
  // savingAsDraft: boolean = false;

  @Field()
  created: Date;

  @Field(type => ProductType)
  product: Product;

  @Field(type => CustomerType)
  customer: Customer;
}