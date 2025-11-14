import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { HOrder } from './H_ORDER.entity';
import { GoodsName } from 'src/goods/entities/GOODS_NAME.entity';

@Entity('D_ORDER')
export class DOrder {
    @PrimaryColumn({ name: 'Order_no', type: 'int' })
    order_no: number;

    @PrimaryColumn({ name: 'Goods_id', type: 'varchar', length: 10 })
    goods_id: string;

    @ManyToOne(() => HOrder, (h_order) => h_order.d_order, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Order_no', referencedColumnName: 'order_no' })
    order: HOrder;

    @ManyToOne(() => GoodsName, (goods_name) => goods_name.d_order, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Goods_id', referencedColumnName: 'goods_id' })
    goods: GoodsName;

    @CreateDateColumn({ name: 'Doc_date', nullable: true })
    doc_date: Date;

    @Column({ name: 'Ord_date', type: 'timestamp', nullable: false, default: () => "'2000-01-01 00:00:00'" })
    ord_date: Date;

    @Column({ name: 'Fin_date', type: 'timestamp', nullable: true })
    fin_date: Date;

    @Column({ name: 'Amount', type: 'numeric', precision: 10, scale: 2, nullable: false, default: 0 })
    amount: number;

    @Column({ name: 'COST_UNIT', type: 'numeric', precision: 8, scale: 2, nullable: false, default: 0 })
    cost_unit: number;

    @Column({ name: 'TOT_PRC', type: 'numeric', precision: 10, scale: 2, nullable: false, default: 0 })
    tot_prc: number;
}
