import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  create(@Body() dto: CreateGoodDto) {
    return this.goodsService.create(dto);
  }

  @Get()
  findAll() {
    return this.goodsService.findAll();
  }

  @Put()
  update(@Body() dto: UpdateGoodDto) {
    return this.goodsService.update(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(id);
  }
}
