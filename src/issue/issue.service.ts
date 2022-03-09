import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantService } from '../applicant/applicant.service';
import { CurrentApplicantTokenDto } from '../applicant/dto/current-applicant-token.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Issue } from './issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    private applicantService: ApplicantService
  ) { }

  async create(createIssueDto: CreateIssueDto, currentApplicantTokenDto: CurrentApplicantTokenDto) {
    const issue = await this.issueRepository.create();
    const decodeToken = await this.applicantService.decodeToken(currentApplicantTokenDto);

    issue.subject = createIssueDto.subject;
    issue.description = createIssueDto.description;
    issue.applicant = decodeToken.id;

    return await this.issueRepository.save(issue);
  }
}