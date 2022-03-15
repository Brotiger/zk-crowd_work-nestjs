import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueStatusController } from './issue-status.controller';
import { IssueStatus } from './issue-status.entity';
import { IssueStatusService } from './issue-status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IssueStatus]),
  ],
  controllers: [IssueStatusController],
  providers: [IssueStatusService],
  exports: [
    IssueStatusService
  ]
})
export class IssueStatusModule { }
