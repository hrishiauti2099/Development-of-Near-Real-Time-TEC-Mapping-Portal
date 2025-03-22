import { ApiKeyGuard } from './api-key.guard';
import { Test } from '@nestjs/testing';

describe('ApiKeyGuard', () => {
  let apiKeyGuard: ApiKeyGuard;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiKeyGuard],
    }).compile();

    apiKeyGuard = module.get<ApiKeyGuard>(ApiKeyGuard);
  });

  it('should be defined', () => {
    expect(apiKeyGuard).toBeDefined();
  });
});
