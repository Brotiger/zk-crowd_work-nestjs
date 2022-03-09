import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CurrentUserTokenDto } from '../user/dto/current-user-token.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Issue } from './issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    private userService: UserService
  ) { }

  async create(createIssueDto: CreateIssueDto, currentUserTokenDto: CurrentUserTokenDto) {
    const issue = await this.issueRepository.create();
    const decodeToken = await this.userService.decodeToken(currentUserTokenDto);

    issue.subject = createIssueDto.subject;
    issue.description = createIssueDto.description;
    issue.user = decodeToken.id;

    return await this.issueRepository.save(issue);
  }
}