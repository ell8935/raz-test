import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tracking_number?: string;
}
