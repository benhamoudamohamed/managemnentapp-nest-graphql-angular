import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ProductGroupModule } from './product-group/product-group.module';
import { ProductModule } from './product/product.module';
import { CompanyModule } from './company/company.module';
import { UnitModule } from './unit/unit.module';
import { CustomerModule } from './customer/customer.module';
import { ProviderModule } from './provider/provider.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from './user/shared/rolesGuard';

// host: "51.38.36.196",
// username: "abizayd",
// password: "MehdiSelmi09769857",
// database: "my_db",

// host: "tai.db.elephantsql.com",
// username: "iqzeqotd",
// password: "GW3ZNInnlGHYi5J9x6I4083MctKy02IX",
// database: "iqzeqotd",

// console.clever-cloud.com
// host: "bzvv5ztmqlpw4ickmwqn-postgresql.services.clever-cloud.com",
// port: 5432,
// username: "ujlfvleyuwvpoqm1euvj",
// password: "VMuL84Az71WP7xEE6iYK",
// database: "bzvv5ztmqlpw4ickmwqn",

// sql
// host: "localhost",
// port: 3306,
// username: "root",
// password: "009472938",
// database: "management",

// postgres
// type: 'postgres',
// host: "localhost",
// port: 5432,
// username: "postgres",
// password: "009472938",
// database: "management2",

// hostinger
// host: "46.17.175.1", 
// username: "u678163941_postgres",
// password: "Ora!:;,123",
// database: "u678163941_management2",
// type: 'postgres', 
// port: 3306,

// heroku
// type: 'postgres',
// host: "ec2-34-254-69-72.eu-west-1.compute.amazonaws.com",
// port: 5432,
// username: "jheunovgotvalc",
// password: "8242640eb9f06bded9a90242e8ceb677eecc5938aa20b9b962852637d2937ed8",
// database: "d7crhet71fssek",
// ssl: true,
// extra: {
//   ssl: {
//     rejectUnauthorized: false,
//   },
// },

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "009472938",
      database: "management3",
      synchronize: true,
      entities: ["./scr/**/*.entity.ts", "./dist/**/*.entity.js"]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ headers: req.headers })
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'frontend'),
    // }), 
    AdminModule,
    UserModule,
    ProductGroupModule,
    ProductModule,
    CompanyModule,
    UnitModule,
    CustomerModule,
    ProviderModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
