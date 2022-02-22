import { CacheModule, Module } from '@nestjs/common';
import { CheckCodeService } from './check-code.service';

@Module({
  providers: [
    CheckCodeService
  ],
  imports: [
    CacheModule.register()
  ],
  exports: [
    CheckCodeService
  ]
})

export class CheckCodeModule { }