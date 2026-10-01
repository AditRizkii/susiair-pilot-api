import { BadRequestException, Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { DateRangeDto } from './date-range.dto';
import { type SummaryRange } from './summary-query.dto';
import { APP_TODAY } from '../app-today';

const DAY_MS = 86_400_000;

@Injectable()
export class FlightHoursService {
  constructor(private readonly data: DataService) {}

  byDateRange({ from, to }: DateRangeDto) {
    if (from > to) throw new BadRequestException('from must be before or equal to to');
    return this.data.flightHours.flightHours.filter(({ date }) => date >= from && date <= to);
  }

  summary(range: SummaryRange) {
    const bounds = this.data.flightHours.chartBounds[range];
    const labels = this.displayDates(bounds.displayRangeDays);
    return {
      range,
      ...bounds,
      today: APP_TODAY,
      points: labels.map((date) => ({ date, hours: this.rollingWindowBluffing(date, bounds.windowDays) })),
    };
  }

  // this is a rolling sum calculation :)
  rollingWindowBluffing(endDate: string, windowDays: number) {
    const end = this.toUtcDay(endDate);
    const start = end - (windowDays - 1) * DAY_MS;
    const values = new Map(this.data.flightHours.flightHours.map(({ date, hours }) => [date, hours]));
    let sum = 0;

    for (let day = start; day <= end; day += DAY_MS) {
      sum += values.get(this.fromUtcDay(day)) ?? 0;
    }

    return Number(sum.toFixed(1));
  }

  private displayDates(daysEachSide: number) {
    const today = this.toUtcDay(APP_TODAY);
    return Array.from({ length: daysEachSide * 2 + 1 }, (_, index) => this.fromUtcDay(today + (index - daysEachSide) * DAY_MS));
  }

  private toUtcDay(date: string) {
    return Date.parse(`${date}T00:00:00Z`);
  }

  private fromUtcDay(timestamp: number) {
    return new Date(timestamp).toISOString().slice(0, 10);
  }
}
