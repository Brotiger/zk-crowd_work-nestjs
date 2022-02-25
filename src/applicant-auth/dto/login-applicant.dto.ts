import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty, IsString, Matches } from "class-validator";
import * as dotenv from 'dotenv';

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` })
const mobilePrefixRegex = /^\+/;

export class LoginApplicantDto {
  @ApiProperty({ example: '+7888888888', description: 'Номер телефона' })
  @IsNotEmpty()
  @Matches(mobilePrefixRegex, {
    message: 'phone must start with +'
  })
  @IsMobilePhone(process.env.LOCALE)
  readonly phone: string;

  @ApiProperty({ example: '56fdg56', description: 'Код из СМС' })
  @IsNotEmpty()
  @IsString()
  readonly code: string;
}
