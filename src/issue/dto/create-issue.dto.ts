import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UploadFileDto } from "../../upload-file/dto/upload-file.dto";

export class CreateIssueDto {
  @ApiProperty({ example: 'No light', description: 'Short description' })
  @IsNotEmpty()
  @IsString()
  readonly subject: string;

  @ApiProperty({ example: 'The light went out yesterday', description: 'Description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: [{ 'hash': '78e731027d8fd50ed642340b7c9a63b3' }], description: 'Md5 files hash list' })
  @IsOptional()
  @IsArray()
  readonly files: UploadFileDto[];

  @ApiProperty({ example: 1, description: 'Issue status id' })
  @IsNotEmpty()
  @IsInt()
  readonly statusId: number;
}