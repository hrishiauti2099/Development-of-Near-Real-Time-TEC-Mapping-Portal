import { Module } from '@nestjs/common';
import { IriController } from './iri.controller';
import { IriService } from './iri.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [IriController],
  providers: [IriService],
})
export class IriModule {}
