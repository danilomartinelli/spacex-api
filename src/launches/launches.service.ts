import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { lastValueFrom } from 'rxjs';
import { RocketsService } from '../rockets/rockets.service';
import { QueryDto } from './dto/query.dto';

import { ILaunch } from './interfaces/launch.interface';

@Injectable()
export class LaunchesService {
  constructor(
    private httpService: HttpService,
    private rocketsService: RocketsService,
  ) {}

  private async getLaunch(type: 'next' | 'latest' | string) {
    const { data: launch } = await lastValueFrom(
      this.httpService.get<ILaunch>(
        `https://api.spacexdata.com/v4/launches/${type}`,
      ),
    );

    const rocket = launch.rocket
      ? await this.rocketsService.getOneRocket(launch.rocket)
      : null;

    const formatedLaunch = {
      id: launch.id,
      name: launch.name,
      logo: {
        small: launch.links.patch.small,
        large: launch.links.patch.large,
      },
      date: launch.date_utc,
      rocket,
    };

    return {
      data: [formatedLaunch],
      total: 1,
    };
  }

  private async getLaunches(type: 'upcoming' | 'past', query: QueryDto) {
    const {
      data: { docs, totalDocs },
    } = await lastValueFrom(
      this.httpService.post<{ docs: ILaunch[]; totalDocs: number }>(
        `https://api.spacexdata.com/v5/launches/query`,
        {
          query: {
            ...(type === 'upcoming' ? { upcoming: true } : {}),
            ...(type === 'past' ? { past: true } : {}),
          },
          options: {
            limit: query?.limit ?? 50,
            offset: query?.offset ?? 0,
            sort: {
              ...(query.order === 'desc_date' ? { date_utc: 'desc' } : {}),
              ...(query.order === 'asc_date' ? { date_utc: 'asc' } : {}),
            },
          },
        },
      ),
    );

    const data = await Promise.all(
      docs.map(async (launch) => ({
        id: launch.id,
        name: launch.name,
        logo: {
          small: launch.links.patch.small,
          large: launch.links.patch.large,
        },
        date: launch.date_utc,
        rocket: launch.rocket
          ? await this.rocketsService.getOneRocket(launch.rocket)
          : null,
      })),
    );

    return {
      data,
      total: totalDocs,
    };
  }

  public async latest() {
    return this.getLaunch('latest');
  }

  public async next() {
    return this.getLaunch('next');
  }

  public async upcoming(query: QueryDto) {
    return this.getLaunches('upcoming', query);
  }

  public async past(query: QueryDto) {
    return this.getLaunches('past', query);
  }

  public async getOne(id: string) {
    return this.getLaunch(id);
  }
}
