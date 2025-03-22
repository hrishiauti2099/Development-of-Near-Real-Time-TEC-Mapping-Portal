import { F107Query, F107Value } from '@tec-portal/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty } from 'class-validator';

export class F107QueryDto implements F107Query {
  @ApiProperty({ required: true, example: '2004-10-28', type: 'date' })
  @IsNotEmpty()
  @IsISO8601({ strict: true, strictSeparator: true })
  date: string; // ISO 8601 date
}

export class F107ValueDto implements F107Value {
  @ApiProperty({ required: true, example: '2004-10-28' })
  @IsISO8601({ strict: true, strictSeparator: true })
  date: string; // ISO 8601 date

  @ApiProperty({ required: true, example: 134.25 })
  f107: number;
}
