import { CacheModule, Module } from '@nestjs/common';
import { OneTimeCodeController } from './one-time-code.controller';
import { OneTimeCodeService } from './one-time-code.service';

@Module({
  imports: [
    CacheModule.register()
  ],
  controllers: [OneTimeCodeController],
  providers: [OneTimeCodeService]
})
export class OneTimeCodeModule { }
