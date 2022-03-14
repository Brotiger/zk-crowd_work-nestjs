import { Controller, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiFile } from '../components/api-file/api-file';
import { UploadFileDto } from './dto/upload-file.dto';
import { UploadFileService } from './upload-file.service';

@ApiTags('Files')
@Controller('files')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) { }

  @ApiOperation({ summary: "Create file" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UploadFileDto, description: "Return new unique file name" })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  createFile(
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.uploadFileService.create(file)
  }
}