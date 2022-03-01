import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-meta.dto";

export class PaginatedDto<TData> {
  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: TData[];

  constructor(data: TData[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}