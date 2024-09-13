import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusResponseDto {
  @ApiProperty()
  order_id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  tracking_number: string;

  @ApiProperty()
  updated_at: Date;
}
