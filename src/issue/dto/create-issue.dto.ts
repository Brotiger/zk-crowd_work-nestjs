import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ResponseUploadFileDto } from "../../upload-file/response-dto/response-upload-file.dto";

export class CreateIssueDto {
  @ApiProperty({ example: 'No light', description: 'Short description' })
  @IsNotEmpty()
  @IsString()
  readonly subject: string;

  @ApiProperty({ example: 'The light went out yesterday', description: 'Description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ required: false, type: () => [ResponseUploadFileDto], description: 'Md5 files hash list' })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  readonly files: ResponseUploadFileDto[];

  @ApiProperty({ example: 1, description: 'Issue status id' })
  @IsNotEmpty()
  @IsInt()
  readonly statusId: number;
}