import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginated } from '../components/paginated/api-pagitated';
import { IdDto } from '../dto/id.dto';
import { CreateIssueStatusDto } from './dto/create-issue-status.dto';
import { GetAllIssueStatusDto } from './dto/get-all-issue-status';
import { GetOneIssueStatusDto } from './dto/get-one-issue-status.dto';
import { UpdateIssueStatusDto } from './dto/update-issue-status';
import { IssueStatus } from './issue-status.entity';
import { IssueStatusService } from './issue-status.service';

@ApiTags('Issue status')
@Controller('issue-status')
export class IssueStatusController {
  constructor(private readonly issueStatusService: IssueStatusService) { }

  @ApiOperation({ summary: "Create new issue status" })
  @ApiResponse({ status: 200, type: IssueStatus })
  @Post()
  create(@Query() createIssueStatusDto: CreateIssueStatusDto) {
    return this.issueStatusService.create(createIssueStatusDto);
  }

  @ApiOperation({ summary: "Get issue status list" })
  @ApiPaginated(IssueStatus)
  @Get()
  getAll(@Query() getAllIssueStatusDto: GetAllIssueStatusDto) {
    return this.issueStatusService.getAll(getAllIssueStatusDto);
  }

  @ApiOperation({ summary: "Get issue status by id" })
  @ApiResponse({ status: 200, type: IssueStatus })
  @Get("/:id")
  getOne(@Param() getOneIssueStatusDto: GetOneIssueStatusDto) {
    return this.issueStatusService.getOne(getOneIssueStatusDto.id);
  }

  @ApiOperation({ summary: "Update information about issue status" })
  @ApiResponse({ status: 200, type: IssueStatus })
  @Put("/:id")
  updateCurrent(
    @Param() idDto: IdDto,
    @Body() updateIssueStatusDto: UpdateIssueStatusDto) {
    return this.issueStatusService.updateOne(updateIssueStatusDto, idDto);
  }
}
