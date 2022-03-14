import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { FilesModule } from '../upload-file/upload-file.module';
import { IssueController } from './issue.controller';
import { Issue } from './issue.entity';
import { IssueService } from './issue.service';

@Module({
  imports: [
    FilesModule,
    UserModule,
    FilesModule,
    TypeOrmModule.forFeature([Issue]),
    forwardRef(() => AuthModule)
  ],
  controllers: [IssueController],
  providers: [IssueService]
})
export class IssueModule { }
