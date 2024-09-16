import { Test, TestingModule } from '@nestjs/testing';
import { TokendbService } from './tokendb.service';

describe('TokendbService', () => {
  let service: TokendbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokendbService],
    }).compile();

    service = module.get<TokendbService>(TokendbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
