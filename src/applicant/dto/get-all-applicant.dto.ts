import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class GetAllApplicantDto {
  @ApiProperty({ example: 0, description: 'С какой записи начинать' })
  @IsNumberString()
  readonly offset: number;

  @ApiProperty({ example: 10, description: 'Солько записей запросить' })
  @IsNumberString()
  @IsNotEmpty()
  readonly limit: number;
}
