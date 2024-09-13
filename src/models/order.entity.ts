import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Address } from './address.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column()
  customer_id: string;

  @Column()
  cart_id: string;

  @OneToMany(() => Item, (item) => item.order, { cascade: true, eager: true })
  items: Item[];

  @Column('float')
  total_amount: number;

  @Column()
  currency: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  tracking_number: string;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  shipping_address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
