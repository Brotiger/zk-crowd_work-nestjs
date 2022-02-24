import { Controller, Get, Param, Query, Headers, UseGuards, Put, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicantJwtAuthGuard } from '../applicant-auth/guards/applicant-jwt-auth.guard';
import { Applicant } from './applicant.entity';
import { ApplicantService } from './applicant.service';
import { GetAllApplicantDto } from './dto/get-all-applicant.dto';
import { Request } from 'express';
import { GetOneApplicantDto } from './dto/get-one-applicant.dto';
import { CurrentApplicantTokenDto } from './dto/current-applicant-token.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@ApiTags('Заявители')
@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) { }

  @ApiOperation({ summary: "Получение списка заявителей" })
  @ApiResponse({ status: 200, type: [Applicant] })
  @Get()
  getAll(@Query() getAllApplicantDto: GetAllApplicantDto) {
    return this.applicantService.getAll(getAllApplicantDto);
  }

  @ApiOperation({ summary: "Получение информации о текущем пользователе" })
  @ApiResponse({ status: 200, type: Applicant })
  @UseGuards(ApplicantJwtAuthGuard)
  @Get('/current')
  getCurrent(@Headers() currentApplicantTokenDto: CurrentApplicantTokenDto) {
    return this.applicantService.getCurrent(currentApplicantTokenDto);
  }

  @ApiOperation({ summary: "Получение конкретного пользователя по id" })
  @ApiResponse({ status: 200, type: Applicant })
  @Get("/:id")
  getOne(@Param() getOneApplicantDto: GetOneApplicantDto) {
    return this.applicantService.getOne(getOneApplicantDto.id);
  }

  @ApiOperation({ summary: "Обновление информации о текущем пользователе" })
  @ApiResponse({ status: 200, type: Applicant })
  @UseGuards(ApplicantJwtAuthGuard)
  @Put("/:id")
  updateCurrent(
    @Headers() currentApplicantTokenDto: CurrentApplicantTokenDto,
    @Body() updateApplicantDto: UpdateApplicantDto) {
    return this.applicantService.updateCurrent(currentApplicantTokenDto, updateApplicantDto);
  }
}
