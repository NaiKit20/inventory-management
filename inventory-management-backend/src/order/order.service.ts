import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateHeaderOrderDto } from "./dto/create-header-order.dto";
import { HOrder } from "./entities/H_ORDER.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CusName } from "src/customer/entities/CUS_NAME.entity";
import { DOrder } from "./entities/D_ORDER.entity";
import { MOrder } from "./entities/M_ORDER.entity";
import { CreateDetailOrderDto } from "./dto/create-detail-order.dto";
import { GoodsName } from "src/goods/entities/GOODS_NAME.entity";
import { DeleteDetailOrderDto } from "./dto/delete-detail-order.dto";
import { DeleteHeaderOrderDto } from "./dto/delete-heaer-order.dto";
import { FindHeaderOrderByDateDto } from "./dto/find-header-order-by-date.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(HOrder) private headerOrderRepository: Repository<HOrder>,
    @InjectRepository(DOrder) private detailOrderRepository: Repository<DOrder>,
    @InjectRepository(MOrder) private mOrderRepository: Repository<MOrder>,
    @InjectRepository(GoodsName)
    private goodsNameRepository: Repository<GoodsName>,
    @InjectRepository(CusName) private cusNameRepository: Repository<CusName>,
  ) {}

  async createHeaderOrder(dto: CreateHeaderOrderDto) {
    const customer = await this.cusNameRepository.findOne({
      where: { cus_id: dto.cus_id },
    });
    if (!customer) {
      throw new NotFoundException("Customer not found");
    }

    const orderDate = dto.order_date ? new Date(dto.order_date) : new Date();

    const newHOrder = this.headerOrderRepository.create({
      order_date: orderDate,
      cus_id: customer,
    });
    return this.headerOrderRepository.save(newHOrder);
  }

  async updateHeaderOrder(dto: HOrder) {
    return this.headerOrderRepository.save(dto);
  }

  async deleteHeaderOrder(dto: DeleteHeaderOrderDto) {
    const headerOrder = await this.headerOrderRepository.findOne({
      where: { order_no: dto.Order_no },
    });

    if (!headerOrder) {
      throw new NotFoundException(
        `Header order not found (order_no=${dto.Order_no})`,
      );
    }

    return this.headerOrderRepository.remove(headerOrder);
  }

  findAllHeaderOrder() {
    return this.headerOrderRepository
      .createQueryBuilder("headerOrder")
      .leftJoinAndSelect("headerOrder.cus_id", "customer")
      .leftJoinAndSelect("headerOrder.d_order", "detailOrder")
      .select("headerOrder.cus_id", "cus_id")
      .addSelect("customer.cus_name", "cus_name")
      .addSelect("headerOrder.order_no", "order_no")
      .addSelect("COUNT(detailOrder.order_no)", "order_amount")
      .addSelect("SUM(detailOrder.amount)", "item_amount")
      .groupBy("headerOrder.order_no")
      .addGroupBy("customer.cus_id")
      .getRawMany();
  }

  findHeaderOrderById(id?: number) {
    return this.headerOrderRepository
      .createQueryBuilder("headerOrder")
      .leftJoinAndSelect("headerOrder.cus_id", "customer")
      .leftJoinAndSelect("headerOrder.d_order", "detailOrder")
      .leftJoinAndSelect("detailOrder.goods", "goods")
      .where("headerOrder.Order_no = :id", { id })
      .getOne();
  }

  findHeaderOrderByOrdDate(dto: FindHeaderOrderByDateDto) {
    const startDate = new Date(dto.gdoc_date1);
    const endDate = new Date(dto.gdoc_date2);
    endDate.setHours(23, 59, 59, 999);
    return this.headerOrderRepository
      .createQueryBuilder("headerOrder")
      .leftJoin("headerOrder.cus_id", "customer")
      .leftJoin("headerOrder.d_order", "detailOrder")
      .leftJoin("detailOrder.goods", "goods")
      .select("headerOrder.order_no", "order_no")
      .addSelect("customer.cus_id", "cus_id")
      .addSelect("customer.cus_name", "cus_name")
      .addSelect("goods.goods_id", "goods_id")
      .addSelect("goods.goods_name", "goods_name")
      .addSelect("detailOrder.doc_date", "doc_date")
      .addSelect("detailOrder.ord_date", "ord_date")
      .addSelect("detailOrder.fin_date", "fin_date")
      .addSelect("detailOrder.amount", "amount")
      .addSelect("detailOrder.cost_unit", "cost_unit")
      .addSelect("detailOrder.tot_prc", "tot_prc")
      .addSelect("headerOrder.order_date", "order_date")
      .where("detailOrder.ord_date BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .andWhere("detailOrder.fin_date IS NOT NULL")
      .getRawMany();
  }

  findHeaderOrderByFinDate(dto: FindHeaderOrderByDateDto) {
    const startDate = new Date(dto.gdoc_date1);
    const endDate = new Date(dto.gdoc_date2);
    endDate.setHours(23, 59, 59, 999);
    return this.headerOrderRepository
      .createQueryBuilder("headerOrder")
      .leftJoin("headerOrder.cus_id", "customer")
      .leftJoin("headerOrder.d_order", "detailOrder")
      .leftJoin("detailOrder.goods", "goods")
      .select("headerOrder.order_no", "order_no")
      .addSelect("customer.cus_id", "cus_id")
      .addSelect("customer.cus_name", "cus_name")
      .addSelect("goods.goods_id", "goods_id")
      .addSelect("goods.goods_name", "goods_name")
      .addSelect("detailOrder.doc_date", "doc_date")
      .addSelect("detailOrder.ord_date", "ord_date")
      .addSelect("detailOrder.fin_date", "fin_date")
      .addSelect("detailOrder.amount", "amount")
      .addSelect("detailOrder.cost_unit", "cost_unit")
      .addSelect("detailOrder.tot_prc", "tot_prc")
      .addSelect("headerOrder.order_date", "order_date")
      .where("detailOrder.fin_date BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .getRawMany();
  }

  async createDetailOrder(dto: CreateDetailOrderDto[]) {
    const newDetailOrders: DOrder[] = [];
    for (const detail of dto) {
      const [headerOrder, goods] = await Promise.all([
        this.headerOrderRepository.findOne({
          where: { order_no: detail.Order_no },
        }),
        this.goodsNameRepository.findOne({
          where: { goods_id: detail.Goods_id },
        }),
      ]);

      if (!headerOrder) {
        throw new NotFoundException(
          `Header order not found (order_no=${detail.Order_no})`,
        );
      }
      if (!goods) {
        throw new NotFoundException(
          `Goods not found (goods_id=${detail.Goods_id})`,
        );
      }

      const create = {
        order: headerOrder,
        goods: goods,
        ord_date: detail.Ord_date ? new Date(detail.Ord_date) : new Date(),
        amount: detail.Amount ?? 0,
        cost_unit: detail.COST_UNIT ?? goods.cost_unit ?? 0,
        tot_prc: detail.TOT_PRC,
      };

      if (detail.Fin_date !== "") {
        create["fin_date"] = new Date(detail.Fin_date);
      }

      const newDetailOrder = this.detailOrderRepository.create(create);

      newDetailOrders.push(newDetailOrder);
    }
    return this.detailOrderRepository.save(newDetailOrders);
  }

  async updateDetailOrder(dto: DOrder) {
    return this.detailOrderRepository.save(dto);
  }

  async deleteDetailOrder(dto: DeleteDetailOrderDto) {
    const detailOrder = await this.detailOrderRepository.findOne({
      where: { order_no: dto.Order_no, goods_id: dto.Goods_id },
    });

    if (!detailOrder) {
      throw new NotFoundException(
        `Detail order not found (order_no=${dto.Order_no}, goods_id=${dto.Goods_id})`,
      );
    }

    return this.detailOrderRepository.remove(detailOrder);
  }

  findAllDetailOrder() {
    return this.detailOrderRepository.find();
  }

  async processMasterOrder(dto: FindHeaderOrderByDateDto) {
    const beforeProcessDate = await this.findHeaderOrderByFinDate(dto);

    const newMasterOrders: MOrder[] = [];
    beforeProcessDate.forEach((order) => {
      const masterOrder = this.mOrderRepository.create({
        cus_id: order.cus_id,
        goods_id: order.goods_id,
        doc_date: order.doc_date,
        ord_date: order.ord_date,
        fin_date: order.fin_date,
        amount: order.amount,
        cost_tot: order.tot_prc,
      });
      newMasterOrders.push(masterOrder);
    });

    const res = await this.mOrderRepository.save(newMasterOrders);

    // delete detail orders
    const headerOrderIdToDelete = new Set<number>();
    const detailOrdersToDelete: DOrder[] = [];
    beforeProcessDate.forEach((order) => {
      const detailOrder = this.detailOrderRepository.create({
        order_no: order.order_no,
        goods_id: order.goods_id,
      });
      detailOrdersToDelete.push(detailOrder);
      headerOrderIdToDelete.add(order.order_no);
    });
    await this.detailOrderRepository.remove(detailOrdersToDelete);

    // delete header orders
    if (Array.from(headerOrderIdToDelete).length > 0) {
      const headerOrderToDelete = await this.headerOrderRepository
        .createQueryBuilder("headerOrder")
        .leftJoinAndSelect("headerOrder.d_order", "detailOrder")
        .where("headerOrder.order_no IN (:...ids)", {
          ids: Array.from(headerOrderIdToDelete),
        })
        .getMany();
      await this.headerOrderRepository.remove(
        headerOrderToDelete.filter((hOrder) => hOrder.d_order.length === 0),
      );
    }

    return res;
  }

  findMasterOrder() {
    return this.mOrderRepository.find({
      relations: ["customer", "goods"],
      order: {
        sys_date: "DESC",
      },
    });
  }
}
