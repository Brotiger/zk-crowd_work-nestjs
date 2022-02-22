import { Controller, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Applicant } from './applicant.entity'
import { ApplicantService } from './applicant.service'
import { GetAllApplicantDto } from './dto/get-all-applicant.dto'

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) { }

  @ApiOperation({ summary: "Получение списка заявителей" })
  @ApiResponse({ status: 200, type: [Applicant] })
  @Get()
  getAll(@Query() getAllApplicantDto: GetAllApplicantDto) {
    return this.applicantService.getAll(getAllApplicantDto)
  }
}
