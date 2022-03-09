import { Body, Controller, Post, Headers, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicantJwtAuthGuard } from '../applicant-auth/guards/applicant-jwt-auth.guard';
import { CurrentApplicantTokenDto } from '../applicant/dto/current-applicant-token.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Issue } from './issue.entity';
import { IssueService } from './issue.service';

@ApiTags('Issue')
@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) { }

  @ApiOperation({ summary: "Create issue" })
  @ApiResponse({ status: 201, type: Issue })
  @ApiBearerAuth()
  @UseGuards(ApplicantJwtAuthGuard)
  @Post()
  createIssue(
    @Headers() currentApplicantTokenDto: CurrentApplicantTokenDto,
    @Body() createIssueDto: CreateIssueDto,
  ) {
    return this.issueService.create(createIssueDto, currentApplicantTokenDto)
  }
}
