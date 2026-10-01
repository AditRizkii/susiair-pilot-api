import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  it('calculates expired, soon, and safe document states from fixture today', () => {
    const data = {
      documents: {
        today: '2026-05-31',
        thresholds: { warningDays: 30 },
        documents: [
          { id: 'expired', label: 'Expired', expiryDate: '2026-05-30' },
          { id: 'soon', label: 'Soon', expiryDate: '2026-06-10' },
          { id: 'safe', label: 'Safe', expiryDate: '2026-08-01' },
        ],
      },
    };
    const results = new DocumentsService(data as never).all();

    expect(results.map(({ status }) => status)).toEqual(['expired', 'soon', 'safe']);
    expect(results[1].daysRemaining).toBe(10);
  });
});
