import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CheckCodeModule } from '../check-code/check-code.module';
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    CacheModule.register(),
    ConfigModule,
    CheckCodeModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('jwt_private_key'),
        signOptions: {
          expiresIn: configService.get('jwt_expires_in'),
        },
      }),
      inject: [ConfigService],
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule { }
