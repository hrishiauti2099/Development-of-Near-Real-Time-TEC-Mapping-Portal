import { Test, TestingModule } from '@nestjs/testing';
import { IriController } from './iri.controller';

describe('IriController', () => {
  let controller: IriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IriController]
    }).compile();

    controller = module.get<IriController>(IriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
