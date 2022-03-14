import { Body, Controller, Post, Headers, UseGuards, UseInterceptors, UploadedFile, Get, Param, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiPaginated } from '../components/paginated/api-pagitated';
import { CurrentUserTokenDto } from '../user/dto/current-user-token.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { GetAllIssueDto } from './dto/get-all-issue.dto';
import { GetOneIssueDto } from './dto/get-one-issue.dto';
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

  @ApiOperation({ summary: "Get issue by id" })
  @ApiResponse({ status: 200, type: Issue })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  getOne(@Param() getOneIssueDto: GetOneIssueDto) {
    return this.issueService.getOne(getOneIssueDto.id);
  }

  @ApiOperation({ summary: "Get issues list" })
  @ApiPaginated(Issue)
  @Get()
  getAll(@Query() getAllIssueDto: GetAllIssueDto) {
    return this.issueService.getAll(getAllIssueDto);
  }

  @ApiOperation({ summary: "Get issues by current user" })
  @ApiPaginated(Issue)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/current-user")
  getAllByCurrentUser(
    @Headers() currentUserTokenDto: CurrentUserTokenDto,
    @Query() getAllIssueDto: GetAllIssueDto
  ) {
    return this.issueService.getAllByCurrentUser(getAllIssueDto, currentUserTokenDto);
  }
}
