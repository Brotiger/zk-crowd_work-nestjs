import { Injectable, HttpStatus, Inject, CACHE_MANAGER, HttpException } from '@nestjs/common';

@Injectable()
export class CheckCodeService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: any,
  ) { }

  async checkCode(phone: string, code: string) {
    const cacheCode = await this.cacheManager.get(phone)

    if (cacheCode != code) {
      throw new HttpException('Код не верный', HttpStatus.FORBIDDEN)
    }
    await this.cacheManager.del(phone)
  }
}
