import { Test, TestingModule } from '@nestjs/testing';
import { OrderdbService } from './orderdb.service';

describe('OrderdbService', () => {
  let service: OrderdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderdbService],
    }).compile();

    service = module.get<OrderdbService>(OrderdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
