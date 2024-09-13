import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from '../models/order.entity';
import { Item } from '../models/item.entity';
import { Address } from '../models/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Item, Address])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
