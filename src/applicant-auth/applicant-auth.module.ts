import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ApplicantAuthService } from './applicant-auth.service';
import { ApplicantAuthController } from './applicant-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ApplicantModule } from '../applicant/applicant.module';
import { ConfigModule } from '@nestjs/config';
import { CheckCodeModule } from '../check-code/check-code.module';

@Module({
  providers: [ApplicantAuthService],
  controllers: [ApplicantAuthController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.NODE_ENV}.env`
    }),
    CheckCodeModule,
    forwardRef(() => ApplicantModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    ApplicantAuthService,
    JwtModule
  ]
})
export class ApplicantAuthModule { }
