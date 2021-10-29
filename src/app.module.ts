import { Module } from '@nestjs/common';
import { LaunchesModule } from './launches/launches.module';
import { RocketsModule } from './rockets/rockets.module';

@Module({
  imports: [LaunchesModule, RocketsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
