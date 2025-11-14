import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DOrder } from "./D_ORDER.entity";
import { CusName } from "../../customer/entities/CUS_NAME.entity";

@Entity("H_ORDER")
export class HOrder {
  @PrimaryGeneratedColumn({ name: "Order_no", type: "int" })
  order_no: number;

  @ManyToOne(() => CusName, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
  @JoinColumn({ name: "Cus_id", referencedColumnName: "cus_id" })
  cus_id: CusName;

  @Column({
    name: "Order_Date",
    type: "timestamp",
    nullable: false,
    default: () => "'2000-01-01 00:00:00'",
  })
  order_date: Date;

  @OneToMany(() => DOrder, (d_order) => d_order.order, { cascade: true })
  d_order: DOrder[];
}
