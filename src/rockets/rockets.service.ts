import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { lastValueFrom } from 'rxjs';

import { IRocket } from './interfaces/rocket.interface';

@Injectable()
export class RocketsService {
  constructor(private httpService: HttpService) {}

  async getOneRocket(id: string) {
    const { data: rocket } = await lastValueFrom(
      this.httpService.get<IRocket>(
        `https://api.spacexdata.com/v4/rockets/${id}`,
      ),
    );

    return {
      id: rocket.id,
      name: rocket.name,
      images: rocket.flickr_images,
    };
  }
}
