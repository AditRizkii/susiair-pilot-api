import { Controller, Get, Query } from '@nestjs/common';
import { ScheduleQueryDto } from './schedule-query.dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedules: SchedulesService) {}

  @Get()
  byMonth(@Query() query: ScheduleQueryDto) {
    return this.schedules.byMonth(query);
  }
}
