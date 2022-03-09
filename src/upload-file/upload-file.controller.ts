import { Controller, Post, UseGuards, Headers, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicantJwtAuthGuard } from '../applicant-auth/guards/applicant-jwt-auth.guard';
import { CurrentApplicantTokenDto } from '../applicant/dto/current-applicant-token.dto';
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
  @UseGuards(ApplicantJwtAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  createFile(
    @UploadedFile('file') file: Express.Multer.File,
    @Headers() currentApplicantTokenDto: CurrentApplicantTokenDto,
  ) {
    return this.uploadFileService.create(file, currentApplicantTokenDto)
  }


}
