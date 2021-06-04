import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { MinLength } from 'class-validator/types/decorator/string/MinLength';

@InputType()
export class CreateUnitInput {
  @Field()
  @IsString()
  @MinLength(1)
  name: string;

  @Field()
  @IsString()
  created: Date;
}
