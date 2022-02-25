import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioModule } from 'nestjs-twilio';
import { SmsService } from './sms.service';

@Module({
  providers: [
    SmsService
  ],
  imports: [
    CacheModule.register(),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        accountSid: configService.get('twilio_account_sid'),
        authToken: configService.get('twilio_auth_token')
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [
    SmsService
  ]
})
export class SmsModule { }
