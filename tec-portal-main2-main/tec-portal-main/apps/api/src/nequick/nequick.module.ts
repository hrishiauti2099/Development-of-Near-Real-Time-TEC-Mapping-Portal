import { Module } from '@nestjs/common';
import { NeQuickController } from './nequick.controller';
import { NeQuickService } from './nequick.service';

@Module({
  controllers: [NeQuickController],
  providers: [NeQuickService]
})
export class NeQuickModule {
}
