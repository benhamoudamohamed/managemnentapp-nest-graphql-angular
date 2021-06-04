import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductType } from 'src/product/dto/product.input';
import { Product } from 'src/product/entities/product.entity';

@ObjectType('Unit')
export class UnitType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  created: Date;

  // @Field(type => [ProductType])
  // products: Product[];
}
