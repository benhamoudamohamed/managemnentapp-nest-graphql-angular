import { Resolver, Query, Mutation, Args, Int, Context, ID, Float } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CustomerType } from './dto/customer.type';
import { UseGuards } from '@nestjs/common';
import { userAuthGuard } from 'src/user/shared/auth.guard';
import { RolesGuard } from 'src/user/shared/rolesGuard';

@UseGuards(userAuthGuard, RolesGuard)
@Resolver(() => CustomerType)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [CustomerType], { name: 'customers' })
  findAll() {
    return this.customerService.findAll();
  }

  @Query(() => [CustomerType], { name: 'findCustomerByUser' })
  @UseGuards(userAuthGuard, RolesGuard)
  findByUser(@Args('id', { type: () => ID }) id: string) {
    return this.customerService.findByUser(id);
  }

  @Query(() => [CustomerType], { name: 'findCustomerByCompany' })
  @UseGuards(userAuthGuard, RolesGuard)
  findByCompany(@Args('id', { type: () => ID }) id: string) {
    return this.customerService.findByCompany(id);
  }

  @Query(() => CustomerType, { name: 'customer' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.customerService.findOne(id); 
  }

  @Mutation(() => CustomerType, { name: 'createCustomer' })
  async create(
    @Context('user') user, 
    @Args('name') name: string,
    @Args('image') image: string,
    @Args('address') address: string,
    @Args('mobile', { type: () => Int }) mobile: number,
    @Args('fax', { type: () => Int }) fax: number,
    @Args('email') email: string,
    @Args('discountRate', { type: () => Float }) discountRate: number,
    @Args('customerCompany') customerCompany: string,
    @Args('matriculeFiscal') matriculeFiscal: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {name, image, address, mobile, fax, email, discountRate, customerCompany, matriculeFiscal};
    return await this.customerService.create(userId, data, company);
  }

  @Mutation(() => CustomerType, { name: 'updateCustomer' })
  async update(
    @Context('user') user, 
    @Args('id', { type: () => ID }) id: string, 
    @Args('name') name: string,
    @Args('image') image: string,
    @Args('address') address: string,
    @Args('mobile', { type: () => Int }) mobile: number,
    @Args('fax', { type: () => Int }) fax: number,
    @Args('email') email: string,
    @Args('discountRate', { type: () => Float }) discountRate: number,
    @Args('customerCompany') customerCompany: string,
    @Args('matriculeFiscal') matriculeFiscal: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {name, image, address, mobile, fax, email, discountRate, customerCompany, matriculeFiscal};
    return await this.customerService.update(userId, id, data, company);
  }

  @Mutation(() => CustomerType, {name: 'deleteCustomer'})
  async delete(@Args('id', { type: () => ID }) id: string) {
    return await this.customerService.delete(id);
  }
}
