import { Controller, Post, UseGuards, Headers, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUserTokenDto } from '../user/dto/current-user-token.dto';
import { ApiFile } from '../components/api-file/api-file';
import { NewFile } from './dto/new-file.dto';
import { UploadFileService } from './upload-file.service';

@ApiTags('Files')
@Controller('files')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) { }

  @ApiOperation({ summary: "Create file" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: NewFile, description: "Return new unique file name" })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  createFile(
    @UploadedFile('file') file: Express.Multer.File,
    @Headers() currentUserTokenDto: CurrentUserTokenDto,
  ) {
    return this.uploadFileService.create(file, currentUserTokenDto)
  }
}