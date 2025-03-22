import { Module } from '@nestjs/common';
import { AiTecController } from './aitec.controller';
import { AiTecService } from './aitec.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AiTecController],
  providers: [AiTecService],
})
export class AiTecModule {}
