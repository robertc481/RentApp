import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNewCarDto } from './dto/cars.dto';
import { Car } from '@prisma/client';

import { BookingsService } from '../bookings/bookings.service';

@Injectable()
export class CarsService {
  constructor(
    private prisma: PrismaService,
    private bookingsService: BookingsService,
  ) {}

  addNewCar(carDetails: CreateNewCarDto) {
    return this.prisma.car.create({
      data: { ...carDetails },
    });
  }

  async getAllCars(): Promise<Car[]> {
    return this.prisma.car.findMany({});
  }

  async getAllCarsAtDate({ dates }: any) {
    const bookings = await this.bookingsService.getAllBookingsInRange(dates);

    const bookedVins = bookings.map((booking) => booking.vin);

    const cars = await this.getAllCars();

    return cars
      .map((car) =>
        bookedVins
          .map((vin) => (vin !== car.vin ? car : false))
          .filter((car) => car),
      )
      .flat(1);
  }

  async getAllCarsByFilter(filter: string): Promise<Car[]> {
    const cars = await this.getAllCars();
    //to do
    return;
  }

  getCarByVin(vin: string) {
    return this.prisma.car.findUnique({
      where: { vin },
    });
  }

  updateCar(id: string, data: any) {
    return this.prisma.car.update({
      where: { id },
      data,
    });
  }

  deleteCar(id: string) {
    return this.prisma.car.delete({
      where: { id },
    });
  }

  async isAvailableAt(vin: string, dates: string[]): Promise<boolean> {
    const car = await this.getCarByVin(vin);

    const vins = await this.bookingsService.getBookedVins(dates);

    return vins.includes(car.vin);
  }
}
