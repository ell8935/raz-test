import { Controller, Get, Param, Put, Body, HttpException, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetOrdersResponseDto } from '../dto/get-orders-response.dto';
import { OrderDto } from '../dto/order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { UpdateOrderStatusResponseDto } from '../dto/update-order-status-response.dto';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('customer/:customer_id')
  async getOrdersByCustomerId(@Param('customer_id') customerId: string): Promise<GetOrdersResponseDto> {
    const orders = await this.orderService.findByCustomerId(customerId);
    return { orders: orders.map((order) => this.orderService.mapToDto(order)) };
  }

  @Get(':order_id')
  async getOrderById(@Param('order_id') orderId: string): Promise<OrderDto> {
    const order = await this.orderService.findById(orderId);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return this.orderService.mapToDto(order);
  }

  @Put(':order_id/status')
  async updateOrderStatus(
    @Param('order_id') orderId: string,
    @Body() updateStatusDto: UpdateOrderStatusDto,
  ): Promise<UpdateOrderStatusResponseDto> {
    const order = await this.orderService.findById(orderId);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    const validStatuses = ['open', 'pending', 'shipped', 'completed', 'cancelled'];
    if (!validStatuses.includes(updateStatusDto.status)) {
      throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
    }

    if (updateStatusDto.status === 'shipped' && !updateStatusDto.tracking_number) {
      throw new HttpException('Tracking number is required when status is shipped', HttpStatus.BAD_REQUEST);
    }

    order.status = updateStatusDto.status;
    if (updateStatusDto.tracking_number !== undefined) {
      order.tracking_number = updateStatusDto.tracking_number;
    }

    const updatedOrder = await this.orderService.update(order);

    // Trigger necessary workflows like notifications and shipping updates

    return {
      order_id: updatedOrder.order_id,
      status: updatedOrder.status,
      tracking_number: updatedOrder.tracking_number,
      updated_at: updatedOrder.updated_at,
    };
  }
}
