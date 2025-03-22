import { Test, TestingModule } from '@nestjs/testing';
import { F107Controller } from './f107.controller';

describe('F107Controller', () => {
  let controller: F107Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [F107Controller]
    }).compile();

    controller = module.get<F107Controller>(F107Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
