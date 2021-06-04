import { Resolver, Query, Mutation, Args, ID, Context, Float, Int } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { InvoiceType } from './dto/invoice.input';
import { UseGuards } from '@nestjs/common';
import { userAuthGuard } from 'src/user/shared/auth.guard';
import { RolesGuard } from 'src/user/shared/rolesGuard';

@UseGuards(userAuthGuard, RolesGuard)
@Resolver(() => InvoiceType)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Query(() => [InvoiceType], { name: 'invoices' })
  findAll() {
    return this.invoiceService.findAll();
  }

  @Query(() => [InvoiceType], { name: 'findInvoiceByCompany' })
  @UseGuards(userAuthGuard, RolesGuard)
  findByCompany(@Args('id', { type: () => ID }) id: string) {
    return this.invoiceService.findByCompany(id);
  }

  @Query(() => InvoiceType, { name: 'invoice' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.invoiceService.findOne(id); 
  }

  @Mutation(() => InvoiceType, { name: 'createInvoice' })
  async create(
    @Context('user') user, 
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('sellingPriceTTC', { type: () => Float }) sellingPriceTTC: number,
    @Args('total', { type: () => Float }) total: number,
    @Args('subamount', { type: () => Float }) subamount: number,
    @Args('discount', { type: () => Float }) discount: number,
    @Args('totalAfterDiscount', { type: () => Float }) totalAfterDiscount: number,
    @Args('stamp', { type: () => Float }) stamp: number,
    @Args('totalAmount', { type: () => Float }) totalAmount: number,
    @Args('customer', { type: () => ID }) customer: string,
    @Args('product', { type: () => ID }) product: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {quantity, sellingPriceTTC, total, subamount, discount, totalAfterDiscount, stamp, totalAmount};
    return await this.invoiceService.create(userId, data, customer, product, company);
  }

  @Mutation(() => InvoiceType, { name: 'updateInvoice' })
  async update(
    @Context('user') user, 
    @Args('id', { type: () => ID }) id: string, 
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('sellingPriceTTC', { type: () => Float }) sellingPriceTTC: number,
    @Args('total', { type: () => Float }) total: number,
    @Args('subamount', { type: () => Float }) subamount: number,
    @Args('discount', { type: () => Float }) discount: number,
    @Args('totalAfterDiscount', { type: () => Float }) totalAfterDiscount: number,
    @Args('stamp', { type: () => Float }) stamp: number,
    @Args('totalAmount', { type: () => Float }) totalAmount: number,
    @Args('customer', { type: () => ID }) customer: string,
    @Args('product', { type: () => ID }) product: string,
    @Args('company', { type: () => ID }) company: string) {
    const { id: userId } = user;
    const data: any = {quantity, sellingPriceTTC, total, subamount, discount, totalAfterDiscount, stamp, totalAmount};
    return await this.invoiceService.update(userId, id, data, customer, product, company);
  }

  @Mutation(() => InvoiceType, {name: 'deleteInvoice'})
  async delete(@Args('id', { type: () => ID }) id: string) {
    return await this.invoiceService.delete(id);
  }
}
