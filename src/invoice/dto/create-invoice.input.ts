import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateInvoiceInput {

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
  @IsString()
  created: Date;
}
