import { DOrder } from 'src/order/entities/D_ORDER.entity';
import { MOrder } from 'src/order/entities/M_ORDER.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('GOODS_NAME')
export class GoodsName {
    @PrimaryColumn({ name: 'Goods_id', type: 'varchar', length: 10, default: '' })
    goods_id: string;

    @Column({ name: 'Goods_name', type: 'varchar', length: 30, nullable: false, default: '' })
    goods_name: string;

    @Column({ name: 'cost_unit', type: 'numeric', precision: 8, scale: 2, nullable: false, default: 0 })
    cost_unit: number;

    @OneToMany(() => DOrder, (d_order) => d_order.goods, { cascade: true })
    d_order: DOrder[];

    @OneToMany(() => MOrder, (m_order) => m_order.goods, { cascade: true })
	m_orders: MOrder[];
}