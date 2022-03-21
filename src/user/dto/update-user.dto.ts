import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import * as dotenv from 'dotenv';

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });
const mobilePrefixRegex = /^\+/;

export class UpdateUserDto {
  @ApiProperty({ required: false, example: process.env.PHONE_EXAMPLE, description: 'Phone number' })
  @IsOptional()
  @IsNotEmpty()
  @Matches(mobilePrefixRegex, {
    message: 'phone must start with +'
  })
  @IsMobilePhone(process.env.LOCALE)
  readonly phone: string;

  @ApiProperty({ required: false, example: 'Leonardo', description: 'First name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ required: false, example: 'Dicaprio', description: 'Last name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ required: false, example: 'example@example.ru', description: 'Email' })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
