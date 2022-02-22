import { CacheModule, forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApplicantModule } from './applicant/applicant.module';
import { OneTimeCodeModule } from './one-time-code/one-time-code.module';
import { ApplicantAuthModule } from './applicant-auth/applicant-auth.module';

@Module({
  imports: [
    forwardRef(() => ApplicantModule),
    CacheModule.register(),
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),

    TypeOrmModule.forRoot(),
    ApplicantModule,
    OneTimeCodeModule,
    ApplicantAuthModule
  ]
})
export class AppModule { }
