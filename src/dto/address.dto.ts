import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  street: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  zip: string;

  @ApiProperty()
  country: string;
}
