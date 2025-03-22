import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AiTecService } from './aitec.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { AitecQueryDto, AitecValueDto } from './aitec.dto';

@Controller('aitec')
export class AiTecController {
  constructor(private readonly aitecService: AiTecService) {}

  @ApiOperation({
    summary:
      'Get AI VTEC for given datetime, latitude, longitude, and F10.7 value',
  })
  @ApiBearerAuth('appId')
  @ApiBearerAuth('apiKey')
  @UseGuards(ApiKeyGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async aitec(@Body() aitecQueryDto: AitecQueryDto): Promise<AitecValueDto> {
    return await this.aitecService.aitec(aitecQueryDto);
  }
}
