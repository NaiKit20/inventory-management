import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { HOrder } from '../../order/entities/H_ORDER.entity';
import { MOrder } from 'src/order/entities/M_ORDER.entity';

@Entity('CUS_NAME')
export class CusName {
	@PrimaryColumn({ name: 'Cus_id', type: 'varchar', length: 5, default: '' })
	cus_id: string;

	@Column({ name: 'Cus_name', type: 'varchar', length: 30, nullable: false, default: '' })
	cus_name: string;

	@OneToMany(() => HOrder, (order) => order.cus_id, { cascade: false })
	orders: HOrder[];

	@OneToMany(() => MOrder, (m_order) => m_order.customer, { cascade: true })
	m_orders: MOrder[];
}
