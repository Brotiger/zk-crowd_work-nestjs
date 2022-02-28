import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { ApplicantType } from "../types/applicant-type";
import * as dotenv from 'dotenv';

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });
const mobilePrefixRegex = /^\+/;

export class CreateApplicantDto {
  @ApiProperty({ example: '+78888888888', description: 'Номер телефона' })
  @IsNotEmpty()
  @Matches(mobilePrefixRegex, {
    message: 'phone must start with +'
  })
  @IsMobilePhone(process.env.LOCALE)
  readonly phone: string;

  @ApiProperty({ example: 'Leonardo', description: 'Имя' })
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: 'Dicaprio', description: 'Фамилия' })
  @IsOptional()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ example: 'example@example.ru', description: 'Email' })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '56fdg56', description: 'Код из СМС' })
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @ApiProperty({ example: 'human', description: 'Кем является заявитель (ЮР/ФИЗ. лицом)' })
  @IsNotEmpty()
  @IsEnum(ApplicantType)
  readonly type: ApplicantType
}
