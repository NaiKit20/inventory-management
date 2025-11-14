import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './goods/goods.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER || 'inventory_management_root',
        password: process.env.DB_PASSWORD || 'inventory_management_password',
        database: process.env.DB_NAME || 'inventory_management_db',
        entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
        synchronize: true,
        migrationsRun: true,
        logging: false,
      }),
    }),
    GoodsModule,
    OrderModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
