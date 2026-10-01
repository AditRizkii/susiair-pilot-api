import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';
import { DataModule } from './data/data.module';
import { FlightHoursModule } from './flight-hours/flight-hours.module';
import { PilotModule } from './pilot/pilot.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({ imports: [DataModule, AuthModule, PilotModule, DocumentsModule, SchedulesModule, FlightHoursModule] })
export class AppModule {}
