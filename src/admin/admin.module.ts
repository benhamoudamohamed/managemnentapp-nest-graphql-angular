import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { Company } from '../company/entities/company.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret:  'topSecret',
      signOptions: {
        expiresIn: '7d'
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt'})
  ],
  providers: [AdminResolver, AdminService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AdminModule {}
