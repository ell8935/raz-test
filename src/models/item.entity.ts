import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @Column('float')
  price: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
