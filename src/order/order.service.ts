import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../models/order.entity';
import { OrderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findByCustomerId(customerId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { customer_id: customerId },
      relations: ['items', 'shipping_address'],
    });
  }

  async findById(orderId: string): Promise<Order> {
    return this.orderRepository.findOne({
      where: { order_id: orderId },
      relations: ['items', 'shipping_address'],
    });
  }

  async update(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }

  mapToDto(order: Order): OrderDto {
    return {
      order_id: order.order_id,
      customer_id: order.customer_id,
      cart_id: order.cart_id,
      items: order.items.map((item) => ({
        product_id: item.product_id,
        price: item.price,
        quantity: item.quantity,
      })),
      total_amount: order.total_amount,
      currency: order.currency,
      status: order.status,
      tracking_number: order.tracking_number,
      shipping_address: {
        street: order.shipping_address.street,
        city: order.shipping_address.city,
        state: order.shipping_address.state,
        zip: order.shipping_address.zip,
        country: order.shipping_address.country,
      },
      created_at: order.created_at,
      updated_at: order.updated_at,
    };
  }
}
