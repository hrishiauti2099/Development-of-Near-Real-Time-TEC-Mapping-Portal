import { Module } from '@nestjs/common';
import { F107Controller } from './f107.controller';
import { F107Service } from './f107.service';
import { ScraperModule } from '../scraper/scraper.module';

@Module({
  imports: [ScraperModule],
  controllers: [F107Controller],
  providers: [F107Service],
})
export class F107Module {}
