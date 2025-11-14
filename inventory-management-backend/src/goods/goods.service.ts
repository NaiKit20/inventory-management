import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { CreateGoodDto } from "./dto/create-good.dto";
import { UpdateGoodDto } from "./dto/update-good.dto";
import { GoodsName } from "./entities/GOODS_NAME.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsName) private goodsRepository: Repository<GoodsName>,
  ) {}

  async create(dto: CreateGoodDto) {
    const goods = await this.goodsRepository.findOne({
      where: { goods_id: dto.goods_id },
    });
    if (goods) {
      throw new ConflictException("Goods ID already exists");
    }

    const newGood = this.goodsRepository.create(dto);
    return await this.goodsRepository.save(newGood);
  }

  findAll() {
    return this.goodsRepository.find();
  }

  async update(dto: UpdateGoodDto) {
    return this.goodsRepository.save(dto);
  }

  async remove(id: string) {
    const goods = await this.goodsRepository.findOne({
      where: { goods_id: id },
    });
    if (!goods) {
      throw new NotFoundException("Good not found");
    }
    return this.goodsRepository.remove(goods);
  }
}
