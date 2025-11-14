import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateHeaderOrderDto } from './dto/create-header-order.dto';
import { CreateDetailOrderDto } from './dto/create-detail-order.dto';
import { DeleteDetailOrderDto } from './dto/delete-detail-order.dto';
import { DeleteHeaderOrderDto } from './dto/delete-heaer-order.dto';
import { HOrder } from './entities/H_ORDER.entity';
import { DOrder } from './entities/D_ORDER.entity';
import { FindHeaderOrderByDateDto } from './dto/find-header-order-by-date.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post('header')
  createHOrder(@Body() dto: CreateHeaderOrderDto) {
    return this.orderService.createHeaderOrder(dto);
  }

  @Put('header')
  updateHeaderOrder(@Body() dto: HOrder) {
    return this.orderService.updateHeaderOrder(dto);
  }

  @Delete('header')
  deleteHeaderOrder(@Query() dto: DeleteHeaderOrderDto) {
    return this.orderService.deleteHeaderOrder(dto);
  }

  @Get('header')
  findAllHeaderOrder() {
    return this.orderService.findAllHeaderOrder();
  }

  @Get('header/:id')
  findHeaderOrderById(@Param('id') id: number) {
    return this.orderService.findHeaderOrderById(id);
  }

  @Get('header/search/ord_date')
  findHeaderOrderByOrdDate(@Query() dto: FindHeaderOrderByDateDto) {
    return this.orderService.findHeaderOrderByOrdDate(dto);
  }

  @Get('header/search/fin_date')
  findHeaderOrderByFinDate(@Query() dto: FindHeaderOrderByDateDto) {
    return this.orderService.findHeaderOrderByFinDate(dto);
  }

  @Get('header/search/fin_date/process')
  processHeaderOrderByFinDate(@Query() dto: FindHeaderOrderByDateDto) {
    return this.orderService.processMasterOrder(dto);
  }

  @Get('master')
  findMasterOrder() {
    return this.orderService.findMasterOrder();
  }

  @Post('detail')
  createDetailOrder(@Body() dto: CreateDetailOrderDto[]) {
    return this.orderService.createDetailOrder(dto);
  }

  @Put('detail')
  updateDetailOrder(@Body() dto: DOrder) {
    return this.orderService.updateDetailOrder(dto);
  }

  @Delete('detail')
  deleteDetailOrder(@Query() dto: DeleteDetailOrderDto) {
    return this.orderService.deleteDetailOrder(dto);
  }

  @Get('detail')
  findAllDetailOrder() {
    return this.orderService.findAllDetailOrder();
  }
}
