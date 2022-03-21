import { ApiProperty } from "@nestjs/swagger";

export class ResponseUploadFileDto {
  constructor(hash: string) {
    this.hash = hash
  }

  @ApiProperty({ example: '78e731027d8fd50ed642340b7c9a63b3', description: 'Md5 hash' })
  readonly hash: string;
}