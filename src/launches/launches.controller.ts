import { Controller, Get, Query } from '@nestjs/common';
import { QueryDto } from './dto/query.dto';
import { LaunchesService } from './launches.service';

@Controller('launches')
export class LaunchesController {
  constructor(private readonly launchesService: LaunchesService) {}

  @Get('next')
  next() {
    return this.launchesService.next();
  }

  @Get('latest')
  latest() {
    return this.launchesService.latest();
  }

  @Get('upcoming')
  upcoming(@Query() query: QueryDto) {
    return this.launchesService.upcoming(query);
  }

  @Get('past')
  past(@Query() query: QueryDto) {
    return this.launchesService.past(query);
  }
}
