import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from 'rxjs';

@Injectable()
export class ApplicantJwtAuthGuard implements CanActivate {
  constructor(private jwtServce: JwtService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User not authorized' });
      }

      const applicant = this.jwtServce.verify(token);

      if (applicant['user'] != 'applicant') {
        throw new HttpException('You are not applicant', HttpStatus.BAD_REQUEST);
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User not authorized' });
    }
  }
}