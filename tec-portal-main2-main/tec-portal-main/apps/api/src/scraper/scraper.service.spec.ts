import { Test, TestingModule } from '@nestjs/testing';
import { ScraperService } from './scraper.service';

describe('ScraperService', () => {
  let service: ScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScraperService],
    }).compile();

    service = module.get<ScraperService>(ScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch the correct daily averaged F10.7 values from Natural Resources Canada', async () => {
    const f107Values = await service.getF107FluxTableNrCanCa();
    expect(f107Values.length).toBeGreaterThan(0);
    expect(f107Values[0].datetime.getTime()).toBe(
      new Date('2004-10-28T17:00:00Z').getTime()
    );
    expect(f107Values[0].f107).toBe(132.7);
    expect(f107Values[1].datetime.getTime()).toBe(
      new Date('2004-10-28T20:00:00Z').getTime()
    );
    expect(f107Values[1].f107).toBe(135.8);
  }, 60000);
});
