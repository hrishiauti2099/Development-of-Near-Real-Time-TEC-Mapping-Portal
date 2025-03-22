import { Test, TestingModule } from '@nestjs/testing';
import { AiTecService } from './aitec.service';

describe('AiTecService', () => {
  let service: AiTecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiTecService]
    }).compile();

    service = module.get<AiTecService>(AiTecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
