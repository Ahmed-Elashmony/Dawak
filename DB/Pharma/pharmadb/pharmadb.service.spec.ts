import { Test, TestingModule } from '@nestjs/testing';
import { PharmadbService } from './pharmadb.service';

describe('PharmadbService', () => {
  let service: PharmadbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PharmadbService],
    }).compile();

    service = module.get<PharmadbService>(PharmadbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
