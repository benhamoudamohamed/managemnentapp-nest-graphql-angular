import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../shared/role.enum';
import { Status } from '../shared/status.enum';

@InputType()
export class CreateUserInput {

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  username: string;

  @Field()
  @IsEmail()
  @MinLength(4)
  @MaxLength(256)
  email: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    {message: 'Passwords format should be: uppercase, lowercase, number or special character'})
  password: string;

  @Field()
  @IsString()
  created: Date;

  @Field(type => UserRole)
  userRole: UserRole;

  @Field(type => Status)
  status: Status;
}
