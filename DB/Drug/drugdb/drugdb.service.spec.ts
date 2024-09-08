import { Test, TestingModule } from '@nestjs/testing';
import { DrugdbService } from './drugdb.service';

describe('DrugdbService', () => {
  let service: DrugdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrugdbService],
    }).compile();

    service = module.get<DrugdbService>(DrugdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
