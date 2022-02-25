import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class SmsService {
  public constructor(
    @InjectTwilio() private readonly client: TwilioClient,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: any,
  ) { }

  async sendSMS(message: string, phone: string) {
    const cacheManagerKey = `code_already_sent_${phone}`;
    if (await this.cacheManager.get(cacheManagerKey)) {
      throw new HttpException('The message with code has already been sent before', HttpStatus.FORBIDDEN);
    } else {
      await this.cacheManager.set(cacheManagerKey, new Date(), { ttl: 300 });
    }

    try {
      return await this.client.messages.create({
        body: message,
        from: this.configService.get('twilio_phone_from'),
        to: phone,
      });
    } catch (e) {
      console.log(e)
      throw new HttpException('Code message not sent', HttpStatus.FORBIDDEN);
    }
  }
}