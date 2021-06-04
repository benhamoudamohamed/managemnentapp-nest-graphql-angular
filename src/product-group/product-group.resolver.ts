import { Resolver, Query, Mutation, Args, Int, Context, ID } from '@nestjs/graphql';
import { ProductGroupService } from './product-group.service';
import { ProductGroupType } from './dto/productGroup.type';
import { UseGuards } from '@nestjs/common';
import { userAuthGuard } from 'src/user/shared/auth.guard';
import { RolesGuard } from 'src/user/shared/rolesGuard';

@UseGuards(userAuthGuard, RolesGuard)
@Resolver(() => ProductGroupType)
export class ProductGroupResolver {
  constructor(private readonly productGroupService: ProductGroupService) {}

  @Query(() => [ProductGroupType], { name: 'productGroups' })
  findAll() {
    return this.productGroupService.findAll();
  }

  @Query(() => [ProductGroupType], { name: 'findproductGroupsByUser' })
  findproductGroupsByUser(@Args('id', { type: () => ID }) id: string) {
    return this.productGroupService.findProductGroupByUser(id);
  }

  @Query(() => [ProductGroupType], { name: 'findProductGroupByCompany' })
  @UseGuards(userAuthGuard, RolesGuard)
  findByCompany(@Args('id', { type: () => ID }) id: string) {
    return this.productGroupService.findByCompany(id);
  }

  @Query(() => ProductGroupType, { name: 'productGroup' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.productGroupService.findOne(id); 
  }

  @Mutation(() => ProductGroupType, { name: 'createProductGroup' })
  async create(
    @Context('user') user, 
    @Args('name') name: string, 
    @Args('image') image: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {name, image};
    return await this.productGroupService.create(userId, data, company);
  }

  @Mutation(() => ProductGroupType, { name: 'updateProductGroup' })
  async update(
    @Context('user') user, 
    @Args('id', {type: () => ID}) id: string, 
    @Args('name') name: string,
    @Args('image') image: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {name, image};
    return await this.productGroupService.update(userId, id, data, company); 
  }

  @Mutation(() => ProductGroupType, {name: 'deleteProductGroup'})
  async delete(@Args('id', { type: () => ID }) id: string) {
    return await this.productGroupService.delete(id);
  }
}
