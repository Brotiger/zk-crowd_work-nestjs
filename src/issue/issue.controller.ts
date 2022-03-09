import { Body, Controller, Post, Headers, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUserTokenDto } from '../user/dto/current-user-token.dto';
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
  @UseGuards(JwtAuthGuard)
  @Post()
  createIssue(
    @Headers() currentUserTokenDto: CurrentUserTokenDto,
    @Body() createIssueDto: CreateIssueDto,
  ) {
    return this.issueService.create(createIssueDto, currentUserTokenDto)
  }
}
