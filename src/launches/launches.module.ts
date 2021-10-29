import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RocketsModule } from '../rockets/rockets.module';
import { LaunchesController } from './launches.controller';
import { LaunchesService } from './launches.service';

@Module({
  imports: [HttpModule, RocketsModule],
  controllers: [LaunchesController],
  providers: [LaunchesService],
})
export class LaunchesModule {}
