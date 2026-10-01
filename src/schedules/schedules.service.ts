import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { ScheduleQueryDto } from './schedule-query.dto';

@Injectable()
export class SchedulesService {
  constructor(private readonly data: DataService) {}

  byMonth({ year, month }: ScheduleQueryDto) {
    const prefix = `${year}-${String(month).padStart(2, '0')}-`;
    return {
      year,
      month,
      today: this.data.schedules.today,
      legend: this.data.schedules.legend,
      schedules: this.data.schedules.schedules.filter((schedule) => schedule.duty_date.startsWith(prefix)),
    };
  }
}
