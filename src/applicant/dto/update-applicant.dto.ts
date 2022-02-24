import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateApplicantDto {
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
}
