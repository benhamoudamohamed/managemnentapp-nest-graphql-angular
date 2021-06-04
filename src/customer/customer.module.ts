import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Invoice } from '../invoice/entities/invoice.entity';
import { UserService } from '../user/user.service';
import { Admin } from 'src/admin/entities/admin.entity';
import { Company } from '../company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, User, Product, Customer, Invoice, Company]),
  ],
  providers: [CustomerResolver, CustomerService]
})
export class CustomerModule {}
