import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CurrentUserTokenDto } from '../user/dto/current-user-token.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Issue } from './issue.entity';
import { UploadFileService } from '../upload-file/upload-file.service';
import { GetAllIssueDto } from './dto/get-all-issue.dto';
import { PageMetaDto } from '../components/paginated/dto/page-meta.dto';
import { PaginatedDto } from '../components/paginated/dto/paginated-dto';
import { IssueStatusService } from '../issue-status/issue-status.service';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IdDto } from '../dto/id.dto';
import { ResponseIssueDto } from './response-dto/response-issue.dto';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    private uploadFileService: UploadFileService,
    private userService: UserService,
    private issueStatusService: IssueStatusService
  ) { }

  async create(createIssueDto: CreateIssueDto, currentUserTokenDto: CurrentUserTokenDto) {
    const issueStatus = await this.issueStatusService.getOne(createIssueDto.statusId)

    const issue = await this.issueRepository.create();
    const decodeToken = await this.userService.decodeToken(currentUserTokenDto);

    issue.subject = createIssueDto.subject;
    issue.description = createIssueDto.description;
    issue.user = decodeToken.id;
    issue.status = issueStatus;

    const files = []

    for (const element of createIssueDto.files) {
      const file = await this.uploadFileService.getByHash(element.hash);

      if (file) {
        files.push(file);
      }
    }

    issue.files = files;

    const issueResult = await this.issueRepository.save(issue);

    return new ResponseIssueDto(issueResult);
  }

  async getOne(issueId: number) {
    try {
      const issue = await this.issueRepository.findOneOrFail(issueId, { relations: ["files", "status"] });

      return new ResponseIssueDto(issue);
    } catch (e) {
      throw new HttpException('Issue is not found', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(getAllIssueDto: GetAllIssueDto) {
    const query = {
      take: getAllIssueDto.limit,
      skip: getAllIssueDto.offset,
      where: {},
      relations: ["status"]
    }

    if (getAllIssueDto.statusId) {
      query.where = {
        'status': getAllIssueDto.statusId
      }
    }

    const [issues, total] = await this.issueRepository.findAndCount(query);

    const pageMetaDto = new PageMetaDto(total, getAllIssueDto.limit, getAllIssueDto.offset)

    return new PaginatedDto(issues, pageMetaDto)
  }

  async getAllByCurrentUser(getAllIssueDto: GetAllIssueDto, currentUserTokenDto: CurrentUserTokenDto) {
    const decodeToken = await this.userService.decodeToken(currentUserTokenDto);

    const query = {
      where: {
        "user": decodeToken.id,
      },
      take: getAllIssueDto.limit,
      skip: getAllIssueDto.offset,
      relations: ["status"]
    }

    if (getAllIssueDto.statusId) {
      query.where['status'] = getAllIssueDto.statusId
    }

    const [issues, total] = await this.issueRepository.findAndCount(query);

    const pageMetaDto = new PageMetaDto(total, getAllIssueDto.limit, getAllIssueDto.offset)

    return new PaginatedDto(issues, pageMetaDto)
  }

  async updateOne(updateIssueDto: UpdateIssueDto, idDto: IdDto) {
    try {
      const issue = await this.issueRepository.findOneOrFail(idDto);

      if (updateIssueDto.statusId) {
        const issueStatus = await this.issueStatusService.getOne(updateIssueDto.statusId)
        issue.status = issueStatus;
      }

      await this.issueRepository.save(issue);
      const issueResult = await this.issueRepository.findOneOrFail(idDto, { relations: ["files", "status"] });

      return new ResponseIssueDto(issueResult);

    } catch (e) {
      throw new HttpException('Issue not updated', HttpStatus.BAD_REQUEST);
    }
  }
}