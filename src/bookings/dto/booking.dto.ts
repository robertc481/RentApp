import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Validate,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}

export class CheckBookingsAtDateDto {
  @IsNotEmpty()
  dates: string[];
}
