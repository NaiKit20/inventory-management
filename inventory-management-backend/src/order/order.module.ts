import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DOrder } from "./entities/D_ORDER.entity";
import { HOrder } from "./entities/H_ORDER.entity";
import { MOrder } from "./entities/M_ORDER.entity";
import { CusName } from "src/customer/entities/CUS_NAME.entity";
import { GoodsName } from "src/goods/entities/GOODS_NAME.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([HOrder, DOrder, MOrder, CusName, GoodsName]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
