import { Injectable } from '@nestjs/common';
import { F107QueryDto, F107ValueDto } from './f107.dto';
import { ScraperService } from '../scraper/scraper.service';
import { PrismaService } from '@tec-portal/prisma-client';
import { dateToUtcIsoDateOnlyString } from '../utils/date';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class F107Service {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scraper: ScraperService
  ) {}

  async f107(f107QueryDto: F107QueryDto): Promise<F107ValueDto> {
    const date = new Date(f107QueryDto.date + 'T00:00:00Z');
    const f107Value = await this.getF107DailyAveraged(date);
    return {
      date: dateToUtcIsoDateOnlyString(date),
      f107: f107Value,
    };
  }

  async latest() {
    const latestF107 = await this.prisma.f107DailyAveraged.findFirst({
      orderBy: { date: 'desc' },
    });
    return {
      date:
        latestF107 === null
          ? null
          : dateToUtcIsoDateOnlyString(latestF107.date),
      f107: latestF107 === null ? null : latestF107.f107,
    };
  }

  async refresh() {
    await this.refreshF107FluxTable();
    return this.latest();
  }

  @Cron('0 20 */6 * * *', { utcOffset: 0 })
  async refreshCron() {
    await this.refreshF107FluxTable();
  }

  async getF107DailyAveraged(date: Date): Promise<number> {
    const utcDate = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
    const f107Value = await this.prisma.f107DailyAveraged.findFirst({
      where: { date: utcDate },
    });
    if (f107Value !== null) {
      return f107Value.f107;
    }
    return null;
  }

  async refreshF107FluxTable(): Promise<void> {
    const f107Values = await this.scraper.getF107FluxTableNrCanCa();

    // Get the latest entry in the f107s_daily_averaged table
    // Discard all entries with a date less than the latest entry
    // Update the latest entry with the new value if it is different
    // Create new entries for the remaining values
    const latestF107Value = await this.prisma.f107DailyAveraged.findFirst({
      orderBy: { date: 'desc' },
    });
    if (latestF107Value) {
      const latestDate = latestF107Value.date;
      const indexOfFirstInstanceWithDatetimeGreaterThanOrEqualToLatestDate =
        f107Values.findIndex((value) => {
          return value.datetime.getTime() >= latestDate.getTime();
        });
      if (indexOfFirstInstanceWithDatetimeGreaterThanOrEqualToLatestDate > 0) {
        // Remove all entries before the first instance with a datetime greater than or equal to the latest date
        f107Values.splice(
          0,
          indexOfFirstInstanceWithDatetimeGreaterThanOrEqualToLatestDate
        );
      }
    }
    const dailyAveragedF107Values = await this.calculateDailyAveragedF107Values(
      f107Values
    );
    for (const { date, f107 } of dailyAveragedF107Values) {
      await this.prisma.$transaction(async (t) => {
        const existingF107Value = await t.f107DailyAveraged.findFirst({
          where: { date },
        });
        if (!existingF107Value) {
          await t.f107DailyAveraged.create({
            data: { date, f107 },
          });
        } else if (existingF107Value.f107 !== f107) {
          await t.f107DailyAveraged.update({
            where: { date },
            data: { f107 },
          });
        }
      });
    }
  }

  async calculateDailyAveragedF107Values(
    f107Values: { datetime: Date; f107: number }[]
  ): Promise<
    {
      date: Date;
      f107: number;
    }[]
  > {
    const dailyAveragedF107Values: { date: Date; f107: number }[] = [];
    for (const f107Value of f107Values) {
      const year = f107Value.datetime.getUTCFullYear();
      const month = f107Value.datetime.getUTCMonth(); // Month is 0-indexed
      const day = f107Value.datetime.getUTCDate();
      const utcDate = new Date(Date.UTC(year, month, day));
      const f107 = f107Value.f107;
      const index = dailyAveragedF107Values.findIndex((value) => {
        return value.date.getTime() === utcDate.getTime();
      });
      if (index < 0) {
        dailyAveragedF107Values.push({ date: utcDate, f107 });
      } else {
        const existingF107 = dailyAveragedF107Values[index].f107;
        dailyAveragedF107Values[index].f107 = (existingF107 + f107) / 2;
      }
    }
    return dailyAveragedF107Values;
  }
}
