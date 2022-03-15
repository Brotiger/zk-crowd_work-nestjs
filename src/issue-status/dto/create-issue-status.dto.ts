import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateIssueStatusDto {
  @ApiProperty({ example: 'New', description: 'Issue status name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}