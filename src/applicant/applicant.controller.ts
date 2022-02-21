import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Applicant } from './applicant.entity'
import { ApplicantService } from './applicant.service'
import { CreateApplicantDto } from './dto/create-applicant.dto'
import { GetAllApplicantDto } from './dto/get-all-applicant.dto'

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) { }

  @ApiOperation({ summary: 'Создание заявителя' })
  @ApiResponse({ status: 201, type: Applicant })
  @Post()
  async create(@Body() createApplicantDto: CreateApplicantDto) {
    return await this.applicantService.create(createApplicantDto)
  }

  @ApiOperation({ summary: "Получение списка заявителей" })
  @ApiResponse({ status: 200, type: [Applicant] })
  @Get()
  async getAll(@Query() getAllApplicantDto: GetAllApplicantDto) {
    return await this.applicantService.getAll(getAllApplicantDto)
  }
}
