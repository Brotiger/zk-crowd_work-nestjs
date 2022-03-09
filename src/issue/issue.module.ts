import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantAuthModule } from '../applicant-auth/applicant-auth.module';
import { ApplicantModule } from '../applicant/applicant.module';
import { FilesModule } from '../upload-file/upload-file.module';
import { IssueController } from './issue.controller';
import { Issue } from './issue.entity';
import { IssueService } from './issue.service';

@Module({
  imports: [
    ApplicantModule,
    FilesModule,
    TypeOrmModule.forFeature([Issue]),
    forwardRef(() => ApplicantAuthModule)
  ],
  controllers: [IssueController],
  providers: [IssueService]
})
export class IssueModule { }
