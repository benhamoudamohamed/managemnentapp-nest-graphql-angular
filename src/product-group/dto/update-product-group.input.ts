import { CreateProductGroupInput } from './create-product-group.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductGroupInput extends PartialType(CreateProductGroupInput) {
  @Field(() => ID)
  id: string;
}
