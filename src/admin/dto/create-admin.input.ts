import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

@InputType()
export class CreateAdminInput {
  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  firstname: string;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  lastname: string;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    {message: 'Passwords format uppercase, lowercase, number or special character'})
  password: string;

  @Field()
  @IsString()
  created: Date;
}
