import { Test, TestingModule } from '@nestjs/testing';
import { NeQuickService } from './nequick.service';

describe('NeQuickService', () => {
  let service: NeQuickService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeQuickService]
    }).compile();

    service = module.get<NeQuickService>(NeQuickService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
