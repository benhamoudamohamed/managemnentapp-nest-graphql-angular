import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { UserType } from '../../user/dto/user.type';
import { Company } from '../../company/entities/company.entity';
import { CompanyType } from 'src/company/dto/company.input';

@ObjectType('Admin')
export class AdminType {
  @Field(type => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  token: string;

  @Field()
  created: Date;

  // @Field(type => [UserType])
  // users: User[];

  // @Field(type => [CompanyType])
  // companies: Company[];
}