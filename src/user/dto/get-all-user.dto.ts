import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, Max } from "class-validator";
import * as dotenv from 'dotenv';

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });

export class GetAllUserDto {
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

  @ApiProperty({ required: false, example: 1, description: 'User type Id' })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  readonly typeId: number;
}
