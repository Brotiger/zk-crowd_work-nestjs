import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetAllApplicantDto {
  @ApiProperty({ example: '0', description: 'С какой записи начинать' })
  @IsNotEmpty()
  @IsNumber()
  readonly offset: number;

  @ApiProperty({ example: '10', description: 'Солько записей запросить' })
  @IsNumber()
  @IsNotEmpty()
  readonly limit: number;
}
