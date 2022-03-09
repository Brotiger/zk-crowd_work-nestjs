import { IsNotEmpty, IsString } from "class-validator";

export class CurrentUserTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly authorization: string;
}
