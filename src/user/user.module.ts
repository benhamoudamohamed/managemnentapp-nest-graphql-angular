import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Admin } from '../admin/entities/admin.entity';
import { Company } from 'src/company/entities/company.entity';
import { Invoice } from '../invoice/entities/invoice.entity';
import { ProductGroup } from '../product-group/entities/product-group.entity';
import { Product } from '../product/entities/product.entity';
import { Unit } from '../unit/entities/unit.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Provider } from '../provider/entities/provider.entity';
import { JwtStrategy } from 'src/admin/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, Company, Invoice, ProductGroup, Product, Unit, Customer, Provider]),
    JwtModule.register({
      secret:  'topSecret',
      signOptions: {
        expiresIn: '1d'
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt'})
  ],
  providers: [UserResolver, UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class UserModule {}
