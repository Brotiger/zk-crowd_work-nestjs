import { forwardRef, Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User } from './user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { UserTypeModule } from '../user-type/user-type.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    UserModule,
    UserTypeModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    UserService
  ]
})
export class UserModule { }
