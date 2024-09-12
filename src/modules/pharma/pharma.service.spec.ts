import { Test, TestingModule } from '@nestjs/testing';
import { PharmaService } from './pharma.service';

describe('PharmaService', () => {
  let service: PharmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PharmaService],
    }).compile();

    service = module.get<PharmaService>(PharmaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
