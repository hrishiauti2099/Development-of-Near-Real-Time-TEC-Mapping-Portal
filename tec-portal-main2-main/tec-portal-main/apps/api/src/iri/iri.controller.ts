import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { IriQueryDto, IriValueDto } from './iri.dto';
import { IriService } from './iri.service';

@Controller('iri')
export class IriController {
  constructor(private readonly iriService: IriService) {}

  @ApiOperation({
    summary:
      'Get IRI VTEC for given datetime, latitude, longitude, and F10.7 value',
  })
  @ApiBearerAuth('appId')
  @ApiBearerAuth('apiKey')
  @UseGuards(ApiKeyGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async iri(@Body() iriQueryDto: IriQueryDto): Promise<IriValueDto> {
    return await this.iriService.iri(iriQueryDto);
  }
}
