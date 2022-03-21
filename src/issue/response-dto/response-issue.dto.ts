import { ApiProperty } from "@nestjs/swagger";
import { IssueStatus } from "../../issue-status/issue-status.entity";
import { ResponseGetFileDto } from "../../upload-file/response-dto/response-get-file.dto";
import { Issue } from "../issue.entity";

export class ResponseIssueDto {
  constructor(issue: Issue) {
    this.subject = issue.subject;
    this.description = issue.description;
    this.status = issue.status;
    this.id = issue.id;

    this.files = issue.files.map(function (ell) {
      return new ResponseGetFileDto(ell.name);
    });
  }

  @ApiProperty({ example: '1', description: 'Unique identificator' })
  readonly id: number;

  @ApiProperty({ example: 'No light', description: 'Short description' })
  readonly subject: string;

  @ApiProperty({ example: 'The light went out yesterday', description: 'Description' })
  readonly description: string;

  @ApiProperty({ type: ResponseGetFileDto, description: 'Md5 files hash list' })
  readonly files: ResponseGetFileDto[];

  @ApiProperty({ type: () => IssueStatus, description: 'Issue status id' })
  readonly status: IssueStatus;
}