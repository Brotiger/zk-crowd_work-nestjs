import { Controller, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiFile } from '../components/api-file/api-file';
import { ResponseUploadFileDto } from './response-dto/response-upload-file.dto';
import { UploadFileService } from './upload-file.service';

@ApiTags('Files')
@Controller('files')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) { }

  @ApiOperation({ summary: "Create file" })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: ResponseUploadFileDto, description: "Return new unique file name" })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  createFile(
    @UploadedFile('file') file,
  ) {
    return this.uploadFileService.create(file)
  }
}