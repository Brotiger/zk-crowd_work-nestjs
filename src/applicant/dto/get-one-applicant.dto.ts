import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class GetOneApplicantDto {
  @ApiProperty({ example: '1', description: 'Applicant id' })
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  readonly id: number;
}
