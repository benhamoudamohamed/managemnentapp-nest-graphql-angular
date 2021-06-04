import { CreateProviderInput } from './create-provider.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProviderInput extends PartialType(CreateProviderInput) {
  @Field(() => ID)
  id: string;
}
