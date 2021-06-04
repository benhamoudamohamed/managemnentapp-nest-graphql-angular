import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { userAuthGuard } from 'src/user/shared/auth.guard';
import { Roles } from 'src/user/shared/roles.decorator';
import { RolesGuard } from 'src/user/shared/rolesGuard';
import { CompanyService } from './company.service';
import { CompanyType } from './dto/company.input';

@UseGuards(userAuthGuard, RolesGuard)
@Resolver(() => CompanyType)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [CompanyType], { name: 'companies' })
  findAll() {
    return this.companyService.findAll();
  }

  @Query(() => [CompanyType], { name: 'findCompanyByAdmin' })
  @Roles('Admin')
  findByAdmin(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.findByAdmin(id);
  }

  @Query(() => CompanyType, { name: 'company' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.findOne(id); 
  }

  @Mutation(() => CompanyType, { name: 'createCompany'})
  @Roles('Admin')
  async create(
    @Context('user') user, 
    @Args('name') name: string, 
    @Args('matriculeFiscal') matriculeFiscal: string, 
    @Args('address') address: string,
    @Args('managerName') managerName: string,
    @Args('managerPhone') managerPhone: string,
    @Args('managerEmail') managerEmail: string,
    @Args('image') image: string) {
    const {id: userId} = user;
    const company: any = {name, matriculeFiscal, address, managerName, managerPhone, managerEmail, image};
    return await this.companyService.create(userId, company);
  }
   
  @Mutation(() => CompanyType, { name: 'updateCompany' })
  @Roles('Admin')
  async update(
    @Context('user') user, 
    @Args('id', { type: () => ID }) id: string, 
    @Args('name') name: string, 
    @Args('matriculeFiscal') matriculeFiscal: string, 
    @Args('address') address: string,
    @Args('managerName') managerName: string,
    @Args('managerPhone') managerPhone: string,
    @Args('managerEmail') managerEmail: string,
    @Args('image') image: string) {
    const { id: userId } = user;
    const data: any = {name, matriculeFiscal, address, managerName, managerPhone, managerEmail, image};
    return await this.companyService.update(userId, id, data); 
  }

  @Mutation(() => CompanyType, {name: 'deleteCompany'})
  @Roles('Admin')
  async delete(@Args('id', { type: () => ID }) id: string) {
    return await this.companyService.delete(id);
  }
}
