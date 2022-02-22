import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApplicantService } from '../applicant/applicant.service';
import { CreateApplicantDto } from '../applicant/dto/create-applicant.dto';
import { LoginApplicantDto } from './dto/login-applicant.dto';

@Injectable()
export class ApplicantAuthService {
  constructor(
    //@Inject(CACHE_MANAGER) private cacheManager: any,
    private applicantService: ApplicantService,
    private jwtService: JwtService
  ) { }

  async login(loginApplicantDto: LoginApplicantDto) {
    /*const cacheCode = await this.cacheManager.get(loginApplicantDto.phone)

    if (cacheCode != loginApplicantDto.code) {
      throw new HttpException('Код не верный', HttpStatus.FORBIDDEN)
    }

    const applicant = await this.validateApplicant(loginApplicantDto)
    return this.generateToken(applicant)*/
  }

  async registration(createApplicantDto: CreateApplicantDto) {
    /*const cacheCode = await this.cacheManager.get(createApplicantDto.phone)

    if (cacheCode != createApplicantDto.code) {
      throw new HttpException('Код не верный', HttpStatus.FORBIDDEN)
    }

    const candidate = await this.applicantService.getByPhone(createApplicantDto.phone)

    if (candidate) {
      throw new HttpException('Пользователь с таким номером уже зарегистрирован', HttpStatus.BAD_REQUEST)
    }

    const applicant = await this.applicantService.create(createApplicantDto)
    return this.generateToken(applicant)*/
  }

  private async generateToken(appicant) {
    /* const payload = { phone: appicant.phone, type: appicant.type, id: appicant.id }
     return {
       token: this.jwtService.sign(payload)
     }*/
  }

  private async validateApplicant(loginApplicantDto: LoginApplicantDto) {
    /*const applicant = await this.applicantService.getByPhone(loginApplicantDto.phone)

    if (applicant) {
      return applicant
    }

    throw new HttpException('Пользователь не найден', HttpStatus.FORBIDDEN)*/
  }
}
