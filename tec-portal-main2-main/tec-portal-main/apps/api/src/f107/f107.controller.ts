import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { F107Service } from './f107.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { F107QueryDto, F107ValueDto } from './f107.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@ApiTags('F107')
@Controller('f107')
export class F107Controller {
  constructor(private readonly f107Service: F107Service) {}

  @ApiOperation({ summary: 'Get F10.7 value for given date' })
  @ApiBearerAuth('appId')
  @ApiBearerAuth('apiKey')
  @UseGuards(ApiKeyGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async f107(@Body() f107QueryDto: F107QueryDto): Promise<F107ValueDto> {
    return await this.f107Service.f107(f107QueryDto);
  }

  @ApiOperation({ summary: 'Get latest available F10.7 value' })
  @ApiBearerAuth('appId')
  @ApiBearerAuth('apiKey')
  @UseGuards(ApiKeyGuard)
  @Get('latest')
  @HttpCode(HttpStatus.OK)
  async latest(): Promise<F107ValueDto> {
    return await this.f107Service.latest();
  }

  @ApiOperation({ summary: 'Refresh F10.7 values' })
  @ApiBearerAuth('appId')
  @ApiBearerAuth('apiKey')
  @UseGuards(ApiKeyGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(): Promise<F107ValueDto> {
    return await this.f107Service.refresh();
  }
}
