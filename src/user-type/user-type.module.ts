import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeController } from './user-type.controller';
import { UserType } from './user-type.entity';
import { UserTypeService } from './user-type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserType]),
  ],
  controllers: [UserTypeController],
  providers: [UserTypeService],
  exports: [
    UserTypeService
  ]
})
export class UserTypeModule { }
