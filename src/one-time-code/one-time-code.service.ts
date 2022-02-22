import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreateOneTimeCodeDto } from './dto/create-one-time-code';
import { generate } from 'randomstring';

@Injectable()
export class OneTimeCodeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: any) { }

  async generate(dto: CreateOneTimeCodeDto) {
    const code = generate(7);
    console.log(code);
    await this.cacheManager.set(dto.phone, code, { ttl: 300 });
  }
}