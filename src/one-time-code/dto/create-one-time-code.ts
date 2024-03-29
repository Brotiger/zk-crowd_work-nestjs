import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty, Matches } from "class-validator";
import * as dotenv from 'dotenv';

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` })
const mobilePrefixRegex = /^\+/;

export class CreateOneTimeCodeDto {
  @ApiProperty({ example: process.env.PHONE_EXAMPLE, description: 'Номер телефона' })
  @IsNotEmpty()
  @Matches(mobilePrefixRegex, {
    message: 'phone must start with +'
  })
  @IsMobilePhone(process.env.LOCALE)
  readonly phone: string;
}