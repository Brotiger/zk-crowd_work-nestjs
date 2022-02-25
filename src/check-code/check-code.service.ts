import { Injectable, HttpStatus, Inject, CACHE_MANAGER, HttpException } from '@nestjs/common';

@Injectable()
export class CheckCodeService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: any,
  ) { }

  async checkCode(phone: string, code: string) {
    const cacheManagerKey = `code_${phone}`;
    const cacheCode = await this.cacheManager.get(cacheManagerKey);

    await this.cacheManager.del(cacheManagerKey);

    if (cacheCode != code) {
      throw new HttpException('Code is not correct', HttpStatus.FORBIDDEN);
    }
  }
}
