import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CusName } from "./entities/CUS_NAME.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CusName])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
