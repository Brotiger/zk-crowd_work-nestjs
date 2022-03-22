import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator";

class FileUploadDto {
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  @IsNotEmpty()
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