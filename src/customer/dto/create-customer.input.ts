import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

@InputType()
export class CreateCustomerInput {

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
  @IsString()
  @MinLength(1)
  address: string;

  @Field()
  mobile: number;

  @Field()
  fax: number;

  @Field()
  @IsEmail()
  @MinLength(1)
  email: string;

  @Field()
  discountRate: number;

  @Field()
  @IsString()
  @MinLength(1)
  customerCompany: string;

  @Field()
  @IsString()
  @MinLength(1)
  matriculeFiscal: string;

  @Field()
  @IsString()
  created: Date;
}
