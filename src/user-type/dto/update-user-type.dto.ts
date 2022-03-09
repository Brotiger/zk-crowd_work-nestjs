import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserTypeDto {
  @ApiProperty({ example: 'company', description: 'User type name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}