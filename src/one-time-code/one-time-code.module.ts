import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmsModule } from '../sms/sms.module';
import { OneTimeCodeController } from './one-time-code.controller';
import { OneTimeCodeService } from './one-time-code.service';

@Module({
  imports: [
    ConfigModule,
    CacheModule.register(),
    SmsModule
  ],
  controllers: [OneTimeCodeController],
  providers: [OneTimeCodeService]
})
export class OneTimeCodeModule { }
