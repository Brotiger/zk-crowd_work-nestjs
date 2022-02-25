import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApplicantService } from '../applicant/applicant.service';
import { CreateApplicantDto } from '../applicant/dto/create-applicant.dto';
import { CheckCodeService } from '../check-code/check-code.service';
import { LoginApplicantDto } from './dto/login-applicant.dto';

@Injectable()
export class ApplicantAuthService {
  constructor(
    private applicantService: ApplicantService,
    private checkCodeService: CheckCodeService,
    private jwtService: JwtService
  ) { }

  async login(loginApplicantDto: LoginApplicantDto) {
    await this.checkCodeService.checkCode(loginApplicantDto.phone, loginApplicantDto.code);

    const applicant = await this.validateApplicant(loginApplicantDto);
    return this.generateToken(applicant);
  }

  async registration(createApplicantDto: CreateApplicantDto) {
    await this.checkCodeService.checkCode(createApplicantDto.phone, createApplicantDto.code);

    const candidate = await this.applicantService.getByPhone(createApplicantDto.phone);

    if (candidate) {
      throw new HttpException('User with this number is already registered', HttpStatus.BAD_REQUEST);
    }

    const applicant = await this.applicantService.create(createApplicantDto);
    return this.generateToken(applicant);
  }

  private async generateToken(appicant) {
    const payload = { type: appicant.type, id: appicant.id, user: 'applicant' }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateApplicant(loginApplicantDto: LoginApplicantDto) {
    const applicant = await this.applicantService.getByPhone(loginApplicantDto.phone);

    if (applicant) {
      return applicant;
    }

    throw new HttpException('User is not found', HttpStatus.FORBIDDEN);
  }
}
