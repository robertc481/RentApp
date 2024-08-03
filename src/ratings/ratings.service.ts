import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRatingDto } from './dto/rating.dto';

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService) {}

  creatNewRating(createRatingDto: CreateRatingDto) {
    return this.prisma.rating.create({ data: createRatingDto });
  }

  getAllRatings() {
    return this.prisma.rating.findMany({});
  }

  getRatingByID(id: string) {
    return this.prisma.rating.findUnique({ where: { id: id } });
  }

  update(id: string, updateRatingDto: any) {
    return this.prisma.rating.update({
      where: { id: id },
      data: updateRatingDto,
    });
  }

  deleteRating(id: string) {
    return this.prisma.rating.delete({ where: { id: id } });
  }
}
