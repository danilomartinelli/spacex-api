import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { RocketsService } from './rockets.service';

@Module({
  imports: [HttpModule],
  providers: [RocketsService],
  exports: [RocketsService],
})
export class RocketsModule {}
