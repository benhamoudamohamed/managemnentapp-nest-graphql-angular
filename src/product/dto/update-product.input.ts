import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => ID)
  id: string;
}
