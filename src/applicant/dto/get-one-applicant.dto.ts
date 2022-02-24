import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetOneApplicantDto {
  @ApiProperty({ example: '1', description: 'Id пользователя' })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
