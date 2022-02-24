import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

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
