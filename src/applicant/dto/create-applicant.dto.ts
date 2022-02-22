import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { ApplicantType } from "../types/applicant-type";

export class CreateApplicantDto {
  @ApiProperty({ example: '88888888888', description: 'Номер телефона' })
  @IsNotEmpty()
  @IsPhoneNumber('RU')
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

  @ApiProperty({ example: 'humman/company', description: 'Кем является заявитель (ЮР/ФИЗ. лицом)' })
  @IsNotEmpty()
  @IsEnum(ApplicantType)
  readonly type: ApplicantType
}
