import { Test, TestingModule } from '@nestjs/testing';
import { PharmaController } from './pharma.controller';

describe('PharmaController', () => {
  let controller: PharmaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmaController],
    }).compile();

    controller = module.get<PharmaController>(PharmaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
