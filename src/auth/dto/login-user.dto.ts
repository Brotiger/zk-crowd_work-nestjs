import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty, IsString, Matches } from "class-validator";
import * as dotenv from 'dotenv';

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` })
const mobilePrefixRegex = /^\+/;

export class LoginUserDto {
  @ApiProperty({ example: process.env.PHONE_EXAMPLE, description: 'Phone number' })
  @IsNotEmpty()
  @Matches(mobilePrefixRegex, {
    message: 'phone must start with +'
  })
  @IsMobilePhone(process.env.LOCALE)
  readonly phone: string;

  @ApiProperty({ example: '56fdg56', description: 'SMS code' })
  @IsNotEmpty()
  @IsString()
  readonly code: string;
}
