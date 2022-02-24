import { forwardRef, Module } from '@nestjs/common'
import { ApplicantController } from './applicant.controller'
import { ApplicantService } from './applicant.service'
import { Applicant } from './applicant.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApplicantAuthModule } from '../applicant-auth/applicant-auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Applicant]),
    forwardRef(() => ApplicantAuthModule)
  ],
  controllers: [ApplicantController],
  providers: [ApplicantService],
  exports: [
    ApplicantService
  ]
})
export class ApplicantModule { }
