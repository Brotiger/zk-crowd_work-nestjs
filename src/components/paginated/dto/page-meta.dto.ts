import { ApiProperty } from "@nestjs/swagger";

export class PageMetaDto {
  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly offset: number;

  constructor(total, limit, offset) {
    this.total = total;
    this.limit = limit;
    this.offset = offset;
  }
}