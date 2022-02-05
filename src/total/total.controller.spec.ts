import { Test, TestingModule } from '@nestjs/testing';
import { TotalController } from './total.controller';

describe('Total Controller', () => {
  let controller: TotalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotalController],
    }).compile();

    controller = module.get<TotalController>(TotalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
