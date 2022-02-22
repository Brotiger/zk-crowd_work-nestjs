import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateApplicantDto } from '../applicant/dto/create-applicant.dto';
import { ApplicantAuthService } from './applicant-auth.service';
import { LoginApplicantDto } from './dto/login-applicant.dto';

@ApiTags('Авторизация заявителя')
@Controller('applicant-auth')
export class ApplicantAuthController {
  constructor(private applicantAuthService: ApplicantAuthService) { }

  @Post('/login')
  login(@Body() loginApplicantDto: LoginApplicantDto) {
    return this.applicantAuthService.login(loginApplicantDto)
  }

  @Post('/registration')
  registration(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantAuthService.registration(createApplicantDto)
  }
}
