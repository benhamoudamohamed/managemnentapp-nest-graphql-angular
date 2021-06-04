import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGroup } from 'src/product-group/entities/product-group.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from './entities/product.entity';
import { Unit } from '../unit/entities/unit.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Invoice } from '../invoice/entities/invoice.entity';
import { Company } from 'src/company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ProductGroup, Product, Company, Unit, Customer, Invoice]),
  ],
  providers: [ProductResolver, ProductService]
})
export class ProductModule {}
