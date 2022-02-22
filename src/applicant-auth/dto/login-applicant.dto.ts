import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { ApplicantType } from "../../applicant/types/applicant-type";

export class LoginApplicantDto {
  @ApiProperty({ example: '88888888888', description: 'Номер телефона' })
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  readonly phone: string;

  @ApiProperty({ example: '56fdg56', description: 'Код из СМС' })
  @IsNotEmpty()
  @IsString()
  readonly code: string;
}
