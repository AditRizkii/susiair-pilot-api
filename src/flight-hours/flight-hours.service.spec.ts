import { BadRequestException } from '@nestjs/common';
import { FlightHoursService } from './flight-hours.service';

const data = {
  flightHours: {
    pilot: { name: 'John Doe', totalFlightHours: 10 },
    limits: {},
    chartBounds: {
      '1w': { limit: 40, max: 45, windowDays: 7, displayRangeDays: 1 },
      '1m': { limit: 100, max: 125, windowDays: 30, displayRangeDays: 1 },
      '3m': { limit: 300, max: 325, windowDays: 90, displayRangeDays: 1 },
      '6m': { limit: 600, max: 625, windowDays: 180, displayRangeDays: 1 },
      '1y': { limit: 1050, max: 1200, windowDays: 365, displayRangeDays: 1 },
    },
    flightHours: [
      { date: '2026-05-09', hours: 2 },
      { date: '2026-05-11', hours: 3.5 },
      { date: '2026-05-15', hours: 4 },
      { date: '2026-05-16', hours: 1 },
    ],
  },
};

describe('FlightHoursService', () => {
  const service = new FlightHoursService(data as never);

  it('filters the requested inclusive daily range', () => {
    expect(service.byDateRange({ from: '2026-05-10', to: '2026-05-15' })).toEqual([
      { date: '2026-05-11', hours: 3.5 },
      { date: '2026-05-15', hours: 4 },
    ]);
  });

  it('rejects an inverted date range', () => {
    expect(() => service.byDateRange({ from: '2026-05-16', to: '2026-05-15' })).toThrow(BadRequestException);
  });

  it('counts missing dates as zero and accepts windows before the dataset', () => {
    expect(service.rollingWindowBluffing('2026-05-15', 7)).toBe(9.5);
    expect(service.rollingWindowBluffing('2026-01-01', 7)).toBe(0);
  });

  it('returns display points on both sides of the fixed application today', () => {
    const summary = service.summary('1w');
    expect(summary).toMatchObject({ range: '1w', limit: 40, max: 45, today: '2026-05-15' });
    expect(summary.points.map(({ date }) => date)).toEqual(['2026-05-14', '2026-05-15', '2026-05-16']);
    expect(summary.points[2].hours).toBe(8.5);
  });

  it('preserves a value above the configured limit', () => {
    const overLimitData = { flightHours: { ...data.flightHours, flightHours: [{ date: '2026-05-15', hours: 50 }] } };
    const overLimitService = new FlightHoursService(overLimitData as never);

    expect(overLimitService.summary('1w').points[1].hours).toBe(50);
  });
});
