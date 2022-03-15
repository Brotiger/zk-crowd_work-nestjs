import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateIssueDto {
  @ApiProperty({ example: 2, description: 'New issue status id' })
  @IsNotEmpty()
  @IsInt()
  readonly statusId: number;
}