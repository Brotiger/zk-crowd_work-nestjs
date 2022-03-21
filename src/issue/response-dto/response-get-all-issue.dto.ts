import { ApiProperty } from "@nestjs/swagger";
import { IssueStatus } from "../../issue-status/issue-status.entity";

export class ResponseGetAllIssueDto {
  @ApiProperty({ example: '1', description: 'Issue id' })
  readonly id: number;

  @ApiProperty({ example: 'No light', description: 'Short description' })
  readonly subject: string;

  @ApiProperty({ example: 'The light went out yesterday', description: 'Description' })
  readonly description: string;

  @ApiProperty({ type: IssueStatus, description: 'Issue status' })
  readonly status: IssueStatus;
}