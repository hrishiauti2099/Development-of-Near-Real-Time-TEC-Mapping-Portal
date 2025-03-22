import { Module } from '@nestjs/common';
import { IriModule } from './iri/iri.module';
import { F107Module } from './f107/f107.module';
import { NeQuickModule } from './nequick/nequick.module';
import { AiTecModule } from './aitec/aitec.module';
import { ScraperModule } from './scraper/scraper.module';
import { PrismaClientModule } from '@tec-portal/prisma-client';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaClientModule,
    IriModule,
    F107Module,
    NeQuickModule,
    AiTecModule,
    ScraperModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
