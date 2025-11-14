import { CusName } from 'src/customer/entities/CUS_NAME.entity';
import { GoodsName } from 'src/goods/entities/GOODS_NAME.entity';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity('M_ORDER')
export class MOrder {
    @PrimaryColumn({ name: 'Cus_id', type: 'varchar', length: 5, nullable: false, default: '' })
    cus_id: string;

    @ManyToOne(() => CusName, (cus_name) => cus_name.m_orders, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Cus_id', referencedColumnName: 'cus_id' })
    customer: CusName;

    @PrimaryColumn({ name: 'Goods_id', type: 'varchar', length: 10, nullable: false, default: '' })
    goods_id: string;

    @ManyToOne(() => GoodsName, (goods_name) => goods_name.m_orders, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Goods_id', referencedColumnName: 'goods_id' })
    goods: GoodsName;

    @PrimaryColumn({ name: 'Doc_date', type: 'timestamp', nullable: false, default: () => "'2000-01-01 00:00:00'" })
    doc_date: Date;

    @PrimaryColumn({ name: 'Ord_date', type: 'timestamp', nullable: false, default: () => "'2000-01-01 00:00:00'" })
    ord_date: Date;

    @PrimaryColumn({ name: 'Fin_date', type: 'timestamp', nullable: false, default: () => "'2000-01-01 00:00:00'" })
    fin_date: Date;

    @CreateDateColumn({ name: 'Sys_Date', nullable: true })
    sys_date: Date;

    @Column({ name: 'Order_Date', type: 'timestamp', nullable: false, default: () => "'2000-01-01 00:00:00'" })
    order_date: Date;

    @Column({ name: 'Amount', type: 'numeric', precision: 10, scale: 2, nullable: false, default: 0 })
    amount: number;

    @Column({ name: 'cost_tot', type: 'numeric', precision: 10, scale: 2, nullable: false, default: 0 })
    cost_tot: number;
}
