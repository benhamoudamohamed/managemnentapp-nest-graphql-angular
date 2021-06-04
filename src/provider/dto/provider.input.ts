import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Provider')
export class ProviderType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  address: string;

  @Field()
  mobile: number;

  @Field()
  fax: number;

  @Field()
  email: string;

  @Field()
  providerCompany: string;

  @Field()
  matriculeFiscal: string;

  @Field()
  created: Date;
}