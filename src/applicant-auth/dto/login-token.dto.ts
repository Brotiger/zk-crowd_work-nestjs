import { ApiProperty } from "@nestjs/swagger";

export class LoginTokenDto {
  @ApiProperty({ example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Ijg5MzcwNzA1MTk4IiwidHlw', description: 'Bearer JWT token' })
  readonly token: string;
}
