import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDto } from "./page-meta.dto";

export class PaginatedDto<TData> {
  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  readonly data: TData[];

  constructor(data: TData[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}