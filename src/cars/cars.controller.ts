import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateNewCarDto } from './dto/cars.dto';
import { MyLoggerService } from '../logger/logger.service';

@UseGuards()
@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly logger: MyLoggerService,
  ) {}

  @Post('/create')
  create(@Body() createCarDto: CreateNewCarDto) {
    this.logger.log(`Create new car: ${JSON.stringify(createCarDto)}`);
    return this.carsService.addNewCar(createCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.getAllCars();
  }

  @Get('/filtered')
  findAllByFilter(@Param('filter') filter: any) {
    return this.carsService.getAllCarsByFilter(filter);
  }

  @Get('/at')
  findAllAtDate(@Body() dates: any) {
    return this.carsService.getAllCarsAtDate(dates);
  }

  @Get(':vin')
  findOne(@Param('vin') vin: string) {
    return this.carsService.getCarByVin(vin);
  }

  @Get('/available/:vin')
  isAvailableAt(@Param('vin') vin: string, @Body() dates: any) {
    return this.carsService.isAvailableAt(vin, dates);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.carsService.updateCar(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Delete car: ${id}`);

    return this.carsService.deleteCar(id);
  }
}
