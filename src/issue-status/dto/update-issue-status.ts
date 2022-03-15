import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateIssueStatusDto {
  @ApiProperty({ example: 'Accept', description: 'New issue status name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}