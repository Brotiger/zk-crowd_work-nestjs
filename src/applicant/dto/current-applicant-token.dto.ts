import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CurrentApplicantTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly authorization: string;
}
