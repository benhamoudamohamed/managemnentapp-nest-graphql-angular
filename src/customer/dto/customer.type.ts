import { Field, ID, ObjectType } from '@nestjs/graphql';
import { InvoiceType } from 'src/invoice/dto/invoice.input';
import { Invoice } from '../../invoice/entities/invoice.entity';

@ObjectType('Customer')
export class CustomerType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  address: string;
  
  @Field()
  mobile: number;

  @Field()
  fax: number;

  @Field()
  email: string;

  @Field()
  discountRate: number;

  @Field()
  customerCompany: string;

  @Field()
  matriculeFiscal: string;

  @Field()
  created: Date;

  // @Field(type => [InvoiceType])
  // invoices: Invoice[];
}
