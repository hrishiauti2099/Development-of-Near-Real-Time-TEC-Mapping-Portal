import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator';
import { AitecQuery, AitecValue } from '@tec-portal/shared-types';
import { IsISO8601DateTime } from '../validators/is-iso8601-datetime.validator';

export class AitecQueryDto implements AitecQuery {
  @ApiProperty({
    required: true,
    example: '2020-01-01T00:00:00Z',
    type: 'string',
  })
  @IsNotEmpty()
  @IsISO8601DateTime()
  datetime: string; // ISO 8601 datetime

  @ApiProperty({ required: true, example: 10.0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({ required: true, example: 110.0 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({ required: false, example: 150.0 })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  f107: number;
}

export class AitecValueDto implements AitecValue {
  @ApiProperty({
    required: true,
    example: '2020-01-01T00:00:00Z',
    type: 'string',
  })
  @IsISO8601DateTime()
  datetime: string; // ISO 8601 datetime

  @ApiProperty({ required: true, example: 10.0 })
  latitude: number;

  @ApiProperty({ required: true, example: 110.0 })
  longitude: number;

  @ApiProperty({ required: true, example: 150.0 })
  f107: number;

  @ApiProperty({ required: true, example: 0.0 })
  vtec: number;
}
