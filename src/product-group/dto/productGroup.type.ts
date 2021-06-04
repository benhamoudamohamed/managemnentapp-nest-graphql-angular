import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductType } from 'src/product/dto/product.input';
import { Product } from 'src/product/entities/product.entity';

@ObjectType('ProductGroup')
export class ProductGroupType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  created: Date;

  @Field()
  image: string;

  // @Field(type => [ProductType])
  // products: Product[];
}