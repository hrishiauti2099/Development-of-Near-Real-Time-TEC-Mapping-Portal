import { Test, TestingModule } from '@nestjs/testing';
import { IriService } from './iri.service';

describe('IriService', () => {
  let service: IriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IriService]
    }).compile();

    service = module.get<IriService>(IriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
