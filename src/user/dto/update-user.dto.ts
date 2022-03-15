import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import * as dotenv from 'dotenv';

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });
const mobilePrefixRegex = /^\+/;

export class UpdateUserDto {
  @ApiProperty({ example: process.env.PHONE_EXAMPLE, description: 'Phone number' })
  @IsNotEmpty()
  @Matches(mobilePrefixRegex, {
    message: 'phone must start with +'
  })
  @IsMobilePhone(process.env.LOCALE)
  readonly phone: string;

  @ApiProperty({ example: 'Leonardo', description: 'First name' })
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: 'Dicaprio', description: 'Last name' })
  @IsOptional()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ example: 'example@example.ru', description: 'Email' })
  @IsOptional()
  @IsEmail()
  readonly email: string;
}
