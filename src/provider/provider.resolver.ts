import { Resolver, Query, Mutation, Args, ID, Context, Int } from '@nestjs/graphql';
import { ProviderService } from './provider.service';
import { ProviderType } from './dto/provider.input';
import { UseGuards } from '@nestjs/common';
import { userAuthGuard } from 'src/user/shared/auth.guard';
import { RolesGuard } from 'src/user/shared/rolesGuard';

@UseGuards(userAuthGuard, RolesGuard)
@Resolver(() => ProviderType)
export class ProviderResolver {
  constructor(private readonly providerService: ProviderService) {}

  @Query(() => [ProviderType], { name: 'providers' })
  findAll() {
    return this.providerService.findAll();
  }

  @Query(() => [ProviderType], { name: 'findProviderByCompany' })
  @UseGuards(userAuthGuard, RolesGuard)
  findByCompany(@Args('id', { type: () => ID }) id: string) {
    return this.providerService.findByCompany(id);
  }

  @Query(() => ProviderType, { name: 'provider' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.providerService.findOne(id); 
  }

  @Mutation(() => ProviderType, { name: 'createProvider' })
  async create(
    @Context('user') user, 
    @Args('name') name: string,
    @Args('image') image: string,
    @Args('address') address: string,
    @Args('mobile', { type: () => Int }) mobile: number,
    @Args('fax', { type: () => Int }) fax: number,
    @Args('email') email: string,
    @Args('providerCompany') providerCompany: string,
    @Args('matriculeFiscal') matriculeFiscal: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {name, image, address, mobile, fax, email, providerCompany, matriculeFiscal};
    return await this.providerService.create(userId, data, company);
  }

  @Mutation(() => ProviderType, { name: 'updateProvider' })
  async update(
    @Context('user') user, 
    @Args('id', { type: () => ID }) id: string, 
    @Args('name') name: string,
    @Args('image') image: string,
    @Args('address') address: string,
    @Args('mobile', { type: () => Int }) mobile: number,
    @Args('fax', { type: () => Int }) fax: number,
    @Args('email') email: string,
    @Args('providerCompany') providerCompany: string,
    @Args('matriculeFiscal') matriculeFiscal: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {name, image, address, mobile, fax, email, providerCompany, matriculeFiscal};
    return await this.providerService.update(userId, id, data, company);
  }

  @Mutation(() => ProviderType, {name: 'deleteProvider'})
  async delete(@Args('id', { type: () => ID }) id: string) {
    return await this.providerService.delete(id);
  }
}
