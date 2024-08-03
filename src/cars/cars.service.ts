import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNewCarDto } from './dto/cars.dto';
import { Car } from '@prisma/client';

import { BookingsService } from '../bookings/bookings.service';

@Injectable()
export class CarsService {
  constructor(
    private prisma: PrismaService,
    // @Inject(forwardRef(() => BookingsService))
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

  async getAllCarsAtDate(dates: string[]) {
    try {
      const bookings = await this.bookingsService.getAllBookingsInRange(dates);
      console.log(`bookings get all cars : ${JSON.stringify(bookings)}`);
    } catch (error) {
      console.error(error);
    }
    // const vins = bookings.map((booking) => booking.vin);
    // console.log(vins);
    //
    // const cars = await this.getAllCars();
    //
    // const availableCars = cars
    //   .map((car) =>
    //     vins.map((vin) => (vin !== car.vin ? car : false)).filter((car) => car),
    //   )
    //   .flat(1);
    //
    // console.log(availableCars);
    // return availableCars;
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

  async isAvailableAt(date: string, vin: string): Promise<boolean> {
    const car = await this.getCarByVin(vin);

    /* to do:
     * fetch all bookings, map through them
     * and check if they contain particular vin
     * */

    return car.available;
  }
}
