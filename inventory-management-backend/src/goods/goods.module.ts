import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsName } from './entities/GOODS_NAME.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsName])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
