import { ApiProperty } from "@nestjs/swagger";

export class NewFile {
  constructor(fileName: string) {
    this.fileName = fileName
  }

  @ApiProperty({ example: 'dfgfdg34gfdg45sfsdf.jpg', description: 'New unique file name' })
  readonly fileName: string;
}