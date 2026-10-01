import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly data: DataService) {}

  all() {
    const { today, thresholds, documents } = this.data.documents;
    return documents.map((document) => {
      const daysRemaining = this.daysBetween(today, document.expiryDate);
      const status = daysRemaining <= 0 ? 'expired' : daysRemaining <= thresholds.warningDays ? 'soon' : 'safe';
      return { ...document, daysRemaining, status };
    });
  }

  private daysBetween(from: string, to: string) {
    return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
  }
}
