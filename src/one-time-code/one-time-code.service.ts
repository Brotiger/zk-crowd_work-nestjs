import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreateOneTimeCodeDto } from './dto/create-one-time-code';
import { generate } from 'randomstring';
import { SmsService } from '../sms/sms.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OneTimeCodeService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: any,
    private smsService: SmsService,
    private readonly configService: ConfigService) { }

  async generate(dto: CreateOneTimeCodeDto) {
    const code = generate(7);

    const message = `Confirmation code: ${code}`;

    if (this.configService.get('production')) {
      await this.smsService.sendSMS(message, dto.phone);
    } else {
      console.log(code);
    }

    const cacheManagerKey = `code_${dto.phone}`;
    await this.cacheManager.set(cacheManagerKey, code, { ttl: 300 });
  }
}