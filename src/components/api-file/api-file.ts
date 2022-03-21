import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiProperty } from "@nestjs/swagger"

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export const ApiFile = () => {
  return applyDecorators(
    ApiBody({
      description: 'List of cats',
      type: FileUploadDto,
    })
  )
}