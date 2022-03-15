import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageMetaDto } from '../components/paginated/dto/page-meta.dto';
import { PaginatedDto } from '../components/paginated/dto/paginated-dto';
import { IdDto } from '../dto/id.dto';
import { CreateIssueStatusDto } from './dto/create-issue-status.dto';
import { GetAllIssueStatusDto } from './dto/get-all-issue-status';
import { UpdateIssueStatusDto } from './dto/update-issue-status';
import { IssueStatus } from './issue-status.entity';

@Injectable()
export class IssueStatusService {
  constructor(
    @InjectRepository(IssueStatus)
    private issueStatusRepository: Repository<IssueStatus>,
  ) { }

  public async create(createIssueStatusDto: CreateIssueStatusDto) {
    const candidate = await this.getByName(createIssueStatusDto.name);

    if (candidate) {
      throw new HttpException('Issue status with this name is already exists', HttpStatus.BAD_REQUEST);
    }

    const issueStatus = this.issueStatusRepository.create(createIssueStatusDto);
    issueStatus.name = createIssueStatusDto.name;

    return await this.issueStatusRepository.save(issueStatus);
  }

  async getAll(getAllIssueStatusDto: GetAllIssueStatusDto) {
    const [userType, total] = await this.issueStatusRepository.findAndCount({
      take: getAllIssueStatusDto.limit,
      skip: getAllIssueStatusDto.offset
    });

    const pageMetaDto = new PageMetaDto(total, getAllIssueStatusDto.limit, getAllIssueStatusDto.offset)

    return new PaginatedDto(userType, pageMetaDto)
  }

  async getOne(issueStatusId: number) {
    try {
      const issueStatus = await this.issueStatusRepository.findOneOrFail(issueStatusId);

      return issueStatus;
    } catch (e) {
      throw new HttpException('Issue status is not found', HttpStatus.BAD_REQUEST);
    }
  }

  async updateOne(updateIssueStatusDto: UpdateIssueStatusDto, idDto: IdDto) {
    try {
      const issueStatus = await this.issueStatusRepository.findOneOrFail(idDto);
      issueStatus.name = updateIssueStatusDto.name;

      await this.issueStatusRepository.save(issueStatus)

      return issueStatus;

    } catch (e) {
      throw new HttpException('Issue status not updated', HttpStatus.BAD_REQUEST);
    }
  }

  private async getByName(name: string) {
    try {
      const issueStatus = await this.issueStatusRepository.findOneOrFail({
        where: {
          "name": name
        }
      });

      return issueStatus;
    } catch (e) {
      return false;
    }
  }
}
