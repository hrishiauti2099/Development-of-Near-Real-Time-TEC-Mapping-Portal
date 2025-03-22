import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AitecQueryDto, AitecValueDto } from './aitec.dto';
import * as process from 'node:process';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiTecService {
  constructor(private readonly httpService: HttpService) {}

  async aitec(aitecQueryDto: AitecQueryDto): Promise<AitecValueDto> {
    const url = process.env.TEC_SERVER_URL + '/aitec';
    const response = await firstValueFrom(
      this.httpService.post<AitecValueDto>(url, aitecQueryDto)
    );
    return response.data;
  }
}
