import { CreateUnitInput } from './create-unit.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUnitInput extends PartialType(CreateUnitInput) {
  @Field(() => ID)
  id: string;
}
