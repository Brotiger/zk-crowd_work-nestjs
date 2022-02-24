import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../applicant-auth/guards/jwt-auth.guard';
import { Applicant } from './applicant.entity';
import { ApplicantService } from './applicant.service';
import { GetAllApplicantDto } from './dto/get-all-applicant.dto';
import { Request } from 'express';

@ApiTags('Заявители')
@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) { }

  @ApiOperation({ summary: "Получение списка заявителей" })
  @ApiResponse({ status: 200, type: [Applicant] })
  @Get('/all')
  getAll(@Query() getAllApplicantDto: GetAllApplicantDto) {
    return this.applicantService.getAll(getAllApplicantDto);
  }

  @ApiOperation({ summary: "Получение информации о текущем пользователе" })
  @ApiResponse({ status: 200, type: Applicant })
  @UseGuards(JwtAuthGuard)
  @Get('/current')
  getCurrent(@Req() request: Request) {
    return this.applicantService.getCurrent(request);
  }
}
