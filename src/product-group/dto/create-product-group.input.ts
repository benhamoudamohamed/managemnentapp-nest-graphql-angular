import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateProductGroupInput {
  @Field()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @Field()
  @IsString()
  @MinLength(1)
  image: string;

  @Field()
  @IsString()
  created: Date;
}
