import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Booking } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createBooking(details: any): Promise<Booking> {
    return this.prisma.booking.create({
      data: details,
    });
  }

  async getBookingByID(id: string): Promise<Booking> {
    return this.prisma.booking.findUnique({ where: { id: id } });
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.prisma.booking.findMany({});
  }

  async getAllBookingsInRange(dates: string[]): Promise<Booking[]> {
    const bookings = await this.getAllBookings();
    return bookings.filter((booking) => {
      const startDate1 = dates[0];
      const endDate1 = dates[1];

      const startDate2 = booking.dates[0];
      const endDate2 = booking.dates[1];

      return startDate1 <= endDate2 && endDate1 >= startDate2 ? booking : false;
    });
  }

  deleteBooking(id: string) {
    return this.prisma.booking.delete({ where: { id: id } });
  }

  async calculateBookingTimeLength(bookingId: string) {
    const booking = await this.getBookingByID(bookingId);
    const [startDate, endDate] = booking.dates;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return Math.abs(end - start) / (1000 * 60 * 60 * 24);
  }
}
