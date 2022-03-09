import { forwardRef, Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from '../issue/issue.entity';
import { ApplicantAuthModule } from '../applicant-auth/applicant-auth.module';
import { ApplicantModule } from '../applicant/applicant.module';
import { UploadFile } from './upload-file.entity';

@Module({
  imports: [
    ApplicantModule,
    TypeOrmModule.forFeature([UploadFile]),
    forwardRef(() => ApplicantAuthModule)
  ],
  providers: [UploadFileService],
  exports: [UploadFileService],
  controllers: [UploadFileController]
})
export class FilesModule { }
