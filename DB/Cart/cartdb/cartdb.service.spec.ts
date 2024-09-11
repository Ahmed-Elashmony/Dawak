import { Test, TestingModule } from '@nestjs/testing';
import { CartdbService } from './cartdb.service';

describe('CartdbService', () => {
  let service: CartdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartdbService],
    }).compile();

    service = module.get<CartdbService>(CartdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
