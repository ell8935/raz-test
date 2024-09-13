import { ApiProperty } from '@nestjs/swagger';
import { OrderDto } from './order.dto';

export class GetOrdersResponseDto {
  @ApiProperty({ type: [OrderDto] })
  orders: OrderDto[];
}
