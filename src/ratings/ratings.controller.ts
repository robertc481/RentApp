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
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/rating.dto';

@UseGuards()
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post('/create')
  creatNewRating(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.creatNewRating(createRatingDto);
  }

  @Get('/all')
  getAllRatings() {
    return this.ratingsService.getAllRatings();
  }

  @Get(':id')
  getRatingByID(@Param('id') id: string) {
    return this.ratingsService.getRatingByID(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: any) {
    return this.ratingsService.update(id, updateRatingDto);
  }

  @Delete(':id')
  deleteRating(@Param('id') id: string) {
    return this.ratingsService.deleteRating(id);
  }
}
