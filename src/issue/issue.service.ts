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

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    private uploadFileService: UploadFileService,
    private userService: UserService
  ) { }

  async create(createIssueDto: CreateIssueDto, currentUserTokenDto: CurrentUserTokenDto) {
    const issue = await this.issueRepository.create();
    const decodeToken = await this.userService.decodeToken(currentUserTokenDto);

    issue.subject = createIssueDto.subject;
    issue.description = createIssueDto.description;
    issue.user = decodeToken.id;

    const files = []

    for (const element of createIssueDto.files) {
      const file = await this.uploadFileService.getByHash(element.hash);

      if (file) {
        files.push(file);
      }
    }

    issue.files = files;

    return await this.issueRepository.save(issue);
  }

  async getOne(issueId: number) {
    try {
      const user = await this.issueRepository.findOneOrFail(issueId, { relations: ["files"] });

      return user;
    } catch (e) {
      throw new HttpException('Issue is not found', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(getAllIssueDto: GetAllIssueDto) {
    const [issues, total] = await this.issueRepository.findAndCount({
      take: getAllIssueDto.limit,
      skip: getAllIssueDto.offset
    });

    const pageMetaDto = new PageMetaDto(total, getAllIssueDto.limit, getAllIssueDto.offset)

    return new PaginatedDto(issues, pageMetaDto)
  }

  async getAllByCurrentUser(getAllIssueDto: GetAllIssueDto, currentUserTokenDto: CurrentUserTokenDto) {
    const decodeToken = await this.userService.decodeToken(currentUserTokenDto);

    const [issues, total] = await this.issueRepository.findAndCount({
      where: {
        "id": decodeToken.id
      },
      take: getAllIssueDto.limit,
      skip: getAllIssueDto.offset
    });

    const pageMetaDto = new PageMetaDto(total, getAllIssueDto.limit, getAllIssueDto.offset)

    return new PaginatedDto(issues, pageMetaDto)
  }
}