import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class CurrentUserTokenDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  readonly authorization: string;
}
