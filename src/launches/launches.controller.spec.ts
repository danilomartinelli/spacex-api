import { Test, TestingModule } from '@nestjs/testing';
import { LaunchesController } from './launches.controller';

describe('LaunchesController', () => {
  let controller: LaunchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaunchesController],
    }).compile();

    controller = module.get<LaunchesController>(LaunchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
