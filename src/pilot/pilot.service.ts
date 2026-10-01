import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { APP_TODAY } from '../app-today';

@Injectable()
export class PilotService {
  constructor(private readonly data: DataService) {}

  me() {
    return {
      ...this.data.flightHours.pilot,
      avatarUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=John%20Doe',
      limits: this.data.flightHours.limits,
      today: APP_TODAY,
    };
  }
}
