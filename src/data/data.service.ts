import { Injectable, OnModuleInit } from '@nestjs/common';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

type ChartBound = { limit: number; max: number; windowDays: number; displayRangeDays: number };
type FlightHoursData = { pilot: { name: string; totalFlightHours: number }; limits: Record<string, number>; chartBounds: Record<string, ChartBound>; flightHours: Array<{ date: string; hours: number }> };
type DocumentsData = { today: string; thresholds: { warningDays: number }; documents: Array<{ id: string; label: string; expiryDate: string }> };
type SchedulesData = { today: string; legend: Array<{ code: string; label: string; color: string }>; schedules: Array<{ duty_date: string; [key: string]: unknown }> };

@Injectable()
export class DataService implements OnModuleInit {
  flightHours!: FlightHoursData;
  documents!: DocumentsData;
  schedules!: SchedulesData;

  onModuleInit() {
    this.flightHours = this.read<FlightHoursData>('mock-flight-hours.json');
    this.documents = this.read<DocumentsData>('mock-documents.json');
    this.schedules = this.read<SchedulesData>('mock-schedules.json');
  }

  private read<T>(filename: string): T {
    const localFile = join(process.cwd(), 'data', filename);
    const fixtureFile = existsSync(localFile) ? localFile : join(process.cwd(), '..', filename);
    return JSON.parse(readFileSync(fixtureFile, 'utf8')) as T;
  }
}
