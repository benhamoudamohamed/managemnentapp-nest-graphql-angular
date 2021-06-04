import { Resolver, Query, Mutation, Args, Int, Context, ID, Float } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductType } from './dto/product.input';
import { UseGuards } from '@nestjs/common';
import { userAuthGuard } from 'src/user/shared/auth.guard';
import { RolesGuard } from 'src/user/shared/rolesGuard';

@UseGuards(userAuthGuard, RolesGuard)
@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductType], { name: 'products' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => [ProductType], { name: 'findProductByProductGroup' })
  findProductByProductGroup(@Args('id', { type: () => ID }) id: string) {
    return this.productService.findProductByProductGroup(id);
  }

  @Query(() => [ProductType], { name: 'findProductByCompany' })
  @UseGuards(userAuthGuard, RolesGuard)
  findByCompany(@Args('id', { type: () => ID }) id: string) {
    return this.productService.findByCompany(id);
  }

  @Query(() => ProductType, { name: 'product' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.productService.findOne(id); 
  }

  @Mutation(() => ProductType, { name: 'createProduct' })
  async create(
    @Context('user') user, 
    @Args('name') name: string,
    @Args('image') image: string,
    @Args('stockQuantity', { type: () => Int }) stockQuantity: number,
    @Args('minQuantity', { type: () => Int }) minQuantity: number,
    @Args('buyingPriceHT', { type: () => Float }) buyingPriceHT: number,
    @Args('fodec', { type: () => Float }) fodec: number,
    @Args('tva', { type: () => Float }) tva: number,
    @Args('sellingPriceNet', { type: () => Float }) sellingPriceNet: number,
    @Args('benificeMarge', { type: () => Float }) benificeMarge: number,
    @Args('benificeRate', { type: () => Float }) benificeRate: number,
    @Args('sellingPriceTTC', { type: () => Float }) sellingPriceTTC: number,
    @Args('productGroup', { type: () => ID }) productGroup: string,
    @Args('unit', { type: () => ID }) unit: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {name, image, stockQuantity, minQuantity, buyingPriceHT, fodec, tva, sellingPriceNet, benificeMarge, benificeRate, sellingPriceTTC};
    return await this.productService.create(userId, data, productGroup, unit, company);
  }
 
  @Mutation(() => ProductType, { name: 'updateProduct' })
  async update(
    @Context('user') user, 
    @Args('id', { type: () => ID }) id: string, 
    @Args('name') name: string,
    @Args('image') image: string,
    @Args('stockQuantity', { type: () => Int }) stockQuantity: number,
    @Args('minQuantity', { type: () => Int }) minQuantity: number,
    @Args('buyingPriceHT', { type: () => Float }) buyingPriceHT: number,
    @Args('fodec', { type: () => Float }) fodec: number,
    @Args('tva', { type: () => Float }) tva: number,
    @Args('sellingPriceNet', { type: () => Float }) sellingPriceNet: number,
    @Args('benificeMarge', { type: () => Float }) benificeMarge: number,
    @Args('benificeRate', { type: () => Float }) benificeRate: number,
    @Args('sellingPriceTTC', { type: () => Float }) sellingPriceTTC: number,
    @Args('unit', { type: () => ID }) unitId: string,
    @Args('productGroup', { type: () => ID }) productGroupId: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {name, image, stockQuantity, minQuantity, buyingPriceHT, fodec, tva, sellingPriceNet, benificeMarge, benificeRate, sellingPriceTTC};
    return await this.productService.update(userId, id, data, productGroupId, unitId, company);
  }

  @Mutation(() => ProductType, {name: 'deleteProduct'})
  async delete(@Args('id', { type: () => ID }) id: string) {
    return await this.productService.delete(id);
  }
}
