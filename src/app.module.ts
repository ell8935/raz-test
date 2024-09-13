import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { Order } from './models/order.entity';
import { Item } from './models/item.entity';
import { Address } from './models/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Order, Item, Address],
    }),
    OrderModule,
  ],
})
export class AppModule {}
