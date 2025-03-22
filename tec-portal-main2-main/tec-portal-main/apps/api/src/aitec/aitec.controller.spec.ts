import { Test, TestingModule } from '@nestjs/testing';
import { AiTecController } from './aitec.controller';

describe('AiTecController', () => {
  let controller: AiTecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiTecController]
    }).compile();

    controller = module.get<AiTecController>(AiTecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
