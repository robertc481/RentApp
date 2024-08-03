import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CheckBookingsAtDateDto, CreateBookingDto } from './dto/booking.dto';

@UseGuards()
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('/create')
  createBooking(@Body() bookingDetails: CreateBookingDto) {
    return this.bookingsService.createBooking(bookingDetails);
  }

  @Get('id/:id')
  getBooking(@Param('id') id: string) {
    return this.bookingsService.getBookingByID(id);
  }

  @Get('/all')
  getAllBookings() {
    return this.bookingsService.getAllBookings();
  }

  @Get('/at')
  getAllBookingAtDate(@Body() { dates }: CheckBookingsAtDateDto) {
    return this.bookingsService.getAllBookingsInRange(dates);
  }

  @Delete('id/:id')
  deleteBooking(@Param('id') id: string) {
    return this.bookingsService.deleteBooking(id);
  }

  @Get('id/:id/length')
  checkBookingLength(@Param('id') id: string) {
    return this.bookingsService.calculateBookingTimeLength(id);
  }
}
