import { ApiProperty } from '@nestjs/swagger';
import { ItemDto } from './item.dto';
import { AddressDto } from './address.dto';

export class OrderDto {
  @ApiProperty()
  order_id: string;

  @ApiProperty()
  customer_id: string;

  @ApiProperty()
  cart_id: string;

  @ApiProperty({ type: [ItemDto] })
  items: ItemDto[];

  @ApiProperty()
  total_amount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  tracking_number: string;

  @ApiProperty({ type: AddressDto })
  shipping_address: AddressDto;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
