import { SchedulesService } from './schedules.service';

describe('SchedulesService', () => {
  it('returns only the requested month and includes the legend', () => {
    const data = {
      schedules: {
        legend: [{ code: 'DTY', label: 'On Duty', color: '#10B981' }],
        schedules: [{ duty_date: '2026-05-15', id: 'may' }, { duty_date: '2026-06-01', id: 'june' }],
      },
    };
    const result = new SchedulesService(data as never).byMonth({ year: 2026, month: 5 });

    expect(result.legend).toHaveLength(1);
    expect(result.schedules).toEqual([{ duty_date: '2026-05-15', id: 'may' }]);
  });
});
