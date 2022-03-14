import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, Max } from "class-validator";

export class GetAllIssueDto {
  @ApiProperty({ example: 0, description: 'Offset' })
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number.parseInt(value))
  readonly offset: number;

  @ApiProperty({ example: 10, description: 'Limit' })
  @IsInt()
  @IsNotEmpty()
  @Max(100)
  @Transform(({ value }) => Number.parseInt(value))
  readonly limit: number;
}