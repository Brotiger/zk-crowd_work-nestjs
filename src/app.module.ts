import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApplicantModule } from './applicant/applicant.module';
import { OneTimeCodeModule } from './one-time-code/one-time-code.module';
import { ApplicantAuthModule } from './applicant-auth/applicant-auth.module';
import { CheckCodeService } from './check-code/check-code.service';
import { CheckCodeModule } from './check-code/check-code.module';
import { SmsService } from './sms/sms.service';
import { SmsModule } from './sms/sms.module';
import { configuration } from './config/configuration';
@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true
    }),

    TypeOrmModule.forRoot(),
    ApplicantModule,
    OneTimeCodeModule,
    ApplicantAuthModule,
    CheckCodeModule,
    SmsModule
  ],
  providers: [CheckCodeService, SmsService]
})
export class AppModule { }
