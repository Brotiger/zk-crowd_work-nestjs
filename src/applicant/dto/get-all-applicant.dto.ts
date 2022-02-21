import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";

export class GetAllApplicantDto {
  @IsNotEmpty()
  @IsNumber()
  readonly offset: number;

  @IsNumber()
  @IsNotEmpty()
  readonly limit: number;
}
