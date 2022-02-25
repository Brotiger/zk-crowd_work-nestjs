import { forwardRef, Module } from '@nestjs/common';
import { ApplicantAuthService } from './applicant-auth.service';
import { ApplicantAuthController } from './applicant-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ApplicantModule } from '../applicant/applicant.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CheckCodeModule } from '../check-code/check-code.module';
@Module({
  providers: [ApplicantAuthService],
  controllers: [ApplicantAuthController],
  imports: [
    ConfigModule,
    CheckCodeModule,
    forwardRef(() => ApplicantModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('jwt_private_key'),
        signOptions: {
          expiresIn: configService.get('jwt_expires_in'),
        },
      }),
      inject: [ConfigService],
    })
  ],
  exports: [
    ApplicantAuthService,
    JwtModule
  ]
})
export class ApplicantAuthModule { }
