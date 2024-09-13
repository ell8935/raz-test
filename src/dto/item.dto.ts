import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty()
  product_id: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}
