import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApplicantModule } from './applicant/applicant.module';
import { OneTimeCodeModule } from './one-time-code/one-time-code.module';
import { ApplicantAuthModule } from './applicant-auth/applicant-auth.module';
import { CheckCodeService } from './check-code/check-code.service';
import { CheckCodeModule } from './check-code/check-code.module';
@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.NODE_ENV}.env`
    }),

    TypeOrmModule.forRoot(),
    ApplicantModule,
    OneTimeCodeModule,
    ApplicantAuthModule,
    CheckCodeModule
  ],
  providers: [CheckCodeService]
})
export class AppModule { }
