import { Test, TestingModule } from '@nestjs/testing';
import { F107Service } from './f107.service';

describe('F107Service', () => {
  let service: F107Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [F107Service]
    }).compile();

    service = module.get<F107Service>(F107Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
