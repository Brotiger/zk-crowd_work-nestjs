import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, Max } from "class-validator";
import * as dotenv from 'dotenv';

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });

export class GetAllUserTypeDto {
  @ApiProperty({ example: 0, description: 'Offset' })
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number.parseInt(value))
  readonly offset: number;

  @ApiProperty({ example: 10, description: 'Limit' })
  @IsInt()
  @IsNotEmpty()
  @Max(Number(process.env.PAGINATE_RANGE))
  @Transform(({ value }) => Number.parseInt(value))
  readonly limit: number;
}