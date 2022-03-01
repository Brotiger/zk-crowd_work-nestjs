import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, Max } from "class-validator";

export class GetAllApplicantDto {
  @ApiProperty({ example: 0, description: 'С какой записи начинать' })
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number.parseInt(value))
  readonly offset: number;

  @ApiProperty({ example: 10, description: 'Солько записей запросить' })
  @IsInt()
  @IsNotEmpty()
  @Max(100)
  @Transform(({ value }) => Number.parseInt(value))
  readonly limit: number;
}
