import { Resolver, Query, Mutation, Args, Int, Context, ID } from '@nestjs/graphql';
import { UnitService } from './unit.service';
import { UnitType } from './dto/unit.input';
import { UseGuards } from '@nestjs/common';
import { userAuthGuard } from 'src/user/shared/auth.guard';
import { RolesGuard } from 'src/user/shared/rolesGuard';

@UseGuards(userAuthGuard, RolesGuard)
@Resolver(() => UnitType)
export class UnitResolver {
  constructor(private readonly unitService: UnitService) {}

  @Query(() => [UnitType], { name: 'units' })
  findAll() {
    return this.unitService.findAll();
  }

  @Query(() => [UnitType], { name: 'findUnitByCompany' })
  @UseGuards(userAuthGuard, RolesGuard)
  findByCompany(@Args('id', { type: () => ID }) id: string) {
    return this.unitService.findByCompany(id);
  }

  @Query(() => UnitType, { name: 'unit' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.unitService.findOne(id); 
  }
  
  @Mutation(() => UnitType, { name: 'createUnit' })
  async create(
    @Context('user') user, 
    @Args('name') name: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = { name };
    return await this.unitService.create(userId, data, company);
  }

  @Mutation(() => UnitType, { name: 'updateUnit' })
  async update(
    @Context('user') user, 
    @Args('id', { type: () => ID }) id: string, 
    @Args('name') name: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {name};
    return await this.unitService.update(userId, id, data, company); 
  }

  @Mutation(() => UnitType, {name: 'deleteUnit'})
  async delete(@Args('id', { type: () => ID }) id: string) {
    return await this.unitService.delete(id);
  }
}
