import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';
import { MyLoggerService } from './logger/logger.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { BookingsModule } from './bookings/bookings.module';
import { RatingsModule } from './ratings/ratings.module';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { PaymentsModule } from './payments/payments.module';
import stripeConfig from './stripe.config';
import { AuthorizationService } from './authorization/authorization.service';
import { CustomAuthGuard } from './jwt/custom-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [stripeConfig],
    }),
    AuthorizationModule,
    ConfigModule.forRoot(),
    CarsModule,
    BookingsModule,
    RatingsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MyLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: CustomAuthGuard,
    },
  ],
})
export class AppModule {}
