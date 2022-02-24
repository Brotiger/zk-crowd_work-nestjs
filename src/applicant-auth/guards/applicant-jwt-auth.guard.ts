import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
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
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }

      const applicant = this.jwtServce.verify(token);

      if (applicant['user'] != 'applicant') {
        throw new UnauthorizedException({ message: 'Вы не являетесь заявителем' });
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }
  }
}