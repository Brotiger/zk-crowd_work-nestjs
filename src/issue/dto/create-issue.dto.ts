import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateIssueDto {
  @ApiProperty({ example: 'No light', description: 'Short description' })
  @IsNotEmpty()
  @IsString()
  readonly subject: string;

  @ApiProperty({ example: 'The light went out yesterday', description: 'Description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}