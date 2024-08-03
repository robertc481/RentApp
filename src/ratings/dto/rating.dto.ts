import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Validate,
  IsInt,
} from 'class-validator';

export class CreateRatingDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsInt()
  @IsNotEmpty()
  score: number;

  @IsString()
  @IsNotEmpty()
  description: string;
  
  @IsString()
  @IsNotEmpty()
  vin: string;

  @IsString()
  @IsNotEmpty()
  facility_name: string;

  @IsString()
  @IsNotEmpty()
  booking_id: string;
}
