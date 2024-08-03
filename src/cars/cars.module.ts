import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { PrismaService } from '../prisma.service';
import { MyLoggerModule } from '../logger/logger.module';
import { BookingsModule } from '../bookings/bookings.module';
import { BookingsService } from '../bookings/bookings.service';

@Module({
  imports: [MyLoggerModule, BookingsModule],
  controllers: [CarsController],
  providers: [CarsService, PrismaService, BookingsService],
  exports: [CarsService],
})
export class CarsModule {}
