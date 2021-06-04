import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @Field()
  @IsString()
  @MinLength(1)
  image: string;

  @Field()
  stockQuantity: number;

  @Field()
  minQuantity: number;

  @Field()
  buyingPriceHT: number;

  @Field()
  fodec: number;

  @Field()
  tva: number;

  @Field()
  sellingPriceNet: number;

  @Field()
  benificeMarge: number;

  @Field()
  benificeRate: number;

  @Field()
  sellingPriceTTC: number;

  @Field()
  @IsString()
  created: Date;
}
