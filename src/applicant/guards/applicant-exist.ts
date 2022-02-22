import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class ApplicantExist implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    return true;
  }
}