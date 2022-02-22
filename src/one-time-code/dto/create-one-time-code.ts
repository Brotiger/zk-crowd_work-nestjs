import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateOneTimeCodeDto {
  @ApiProperty({ example: '88888888888', description: 'Номер телефона' })
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  readonly phone: string;
}