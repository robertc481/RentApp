import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Validate,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateNewCarDto {
  @IsString()
  @IsNotEmpty()
  vin: string;

  @IsString()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @IsNotEmpty()
  @IsString()
  service_date: string;

  @IsNotEmpty()
  @IsArray()
  features: string[];

  @IsOptional()
  facility: string;

  @IsOptional()
  facility_id: string;
}

export class GetCarsAtDateDto {
  @IsArray()
  @IsNotEmpty()
  dates: string[];
}
