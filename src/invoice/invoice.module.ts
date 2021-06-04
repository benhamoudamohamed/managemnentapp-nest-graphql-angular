import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { Company } from '../company/entities/company.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Invoice } from './entities/invoice.entity';
import { ProductGroup } from '../product-group/entities/product-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company, Customer, ProductGroup, Product, Invoice]),
  ],
  providers: [InvoiceResolver, InvoiceService]
})
export class InvoiceModule {}
