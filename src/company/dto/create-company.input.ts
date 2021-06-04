import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  matriculeFiscal: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  address: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  managerName: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  managerPhone: string;

  @Field()
  @IsEmail()
  @MinLength(1)
  @MaxLength(50)
  managerEmail: string;

  @Field()
  @IsString()
  @MinLength(1)
  image: string;

  @Field()
  @IsString()
  created: Date;
}
