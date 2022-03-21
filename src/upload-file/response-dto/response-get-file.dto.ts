import { ApiProperty } from "@nestjs/swagger";

export class ResponseGetFileDto {
  constructor(name: string) {
    this.name = name
  }

  @ApiProperty({ example: '78e731027d8fd50ed642340b7c9a63b3.jpg', description: 'File name' })
  readonly name: string;
}