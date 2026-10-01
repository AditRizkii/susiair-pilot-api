import { Controller, Get, Query } from '@nestjs/common';
import { DateRangeDto } from './date-range.dto';
import { FlightHoursService } from './flight-hours.service';
import { SummaryQueryDto } from './summary-query.dto';

@Controller('flight-hours')
export class FlightHoursController {
  constructor(private readonly flightHours: FlightHoursService) {}

  @Get()
  byDateRange(@Query() query: DateRangeDto) {
    return this.flightHours.byDateRange(query);
  }

  @Get('summary')
  summary(@Query() query: SummaryQueryDto) {
    return this.flightHours.summary(query.range);
  }
}
