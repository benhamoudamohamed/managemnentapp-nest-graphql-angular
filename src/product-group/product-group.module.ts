import { Module } from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { ProductGroupResolver } from './product-group.resolver';
import { ProductGroup } from './entities/product-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Company } from '../company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ProductGroup, Company]),
  ],
  providers: [ProductGroupResolver, ProductGroupService]
})
export class ProductGroupModule {}
