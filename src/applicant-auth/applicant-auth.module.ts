import { CacheModule, Module } from '@nestjs/common';
import { ApplicantAuthService } from './applicant-auth.service';
import { ApplicantAuthController } from './applicant-auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ApplicantAuthService],
  controllers: [ApplicantAuthController],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class ApplicantAuthModule { }
