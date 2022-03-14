import { forwardRef, Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from '../issue/issue.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { UploadFile } from './upload-file.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UploadFile]),
    forwardRef(() => AuthModule)
  ],
  providers: [UploadFileService],
  exports: [UploadFileService],
  controllers: [UploadFileController],
})
export class FilesModule { }
