import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { User } from 'src/user/entities/user.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Provider } from '../provider/entities/provider.entity';
import { Product } from '../product/entities/product.entity';
import { ProductGroup } from '../product-group/entities/product-group.entity';
import { Invoice } from '../invoice/entities/invoice.entity';
import { Unit } from '../unit/entities/unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, User, Company, Customer, Provider, Product, ProductGroup, Invoice, Unit]),
  ],
  providers: [CompanyResolver, CompanyService]
})
export class CompanyModule {}
