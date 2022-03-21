import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import * as dotenv from 'dotenv';
import { UserType } from "../../user-type/user-type.entity";

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });
const mobilePrefixRegex = /^\+/;

export class CreateUserDto {
  @ApiProperty({ example: process.env.PHONE_EXAMPLE, description: 'Phone number' })
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

  @ApiProperty({ example: '56fdg56', description: 'SMS code' })
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @ApiProperty({ example: 1, description: 'User type' })
  @IsNotEmpty()
  @IsInt()
  readonly typeId: number
}