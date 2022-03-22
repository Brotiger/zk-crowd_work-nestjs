import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class LoginTokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3ODgyNzQ0LCJleHAiOjE2NDc5NjkxNDR9.hYb7SU0T10BfrvBkwgPONGvZjMKrMixK_fyMBvPfufE', description: 'Bearer JWT token' })
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  readonly token: string;
}
