import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateApplicantDto } from '../applicant/dto/create-applicant.dto';
import { ApplicantAuthService } from './applicant-auth.service';
import { LoginApplicantDto } from './dto/login-applicant.dto';
import { LoginTokenDto } from './dto/login-token.dto';

@ApiTags('Авторизация заявителя')
@Controller('applicant-auth')
export class ApplicantAuthController {
  constructor(private applicantAuthService: ApplicantAuthService) { }

  @ApiOperation({ summary: "Вход" })
  @ApiResponse({ status: 200, type: LoginTokenDto, description: "Вернет jwt токен" })
  @Post('/login')
  login(@Body() loginApplicantDto: LoginApplicantDto) {
    return this.applicantAuthService.login(loginApplicantDto)
  }

  @ApiOperation({ summary: "Регистрация" })
  @ApiResponse({ status: 200, type: LoginTokenDto, description: "Вернет jwt токен" })
  @Post('/registration')
  registration(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantAuthService.registration(createApplicantDto)
  }
}
