import { Test, TestingModule } from '@nestjs/testing';
import { NeQuickController } from './nequick.controller';

describe('NeQuickController', () => {
  let controller: NeQuickController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeQuickController]
    }).compile();

    controller = module.get<NeQuickController>(NeQuickController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
