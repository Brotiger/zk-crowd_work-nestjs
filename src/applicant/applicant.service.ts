import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from './applicant.entity';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { GetAllApplicantDto } from './dto/get-all-applicant.dto';
import { CurrentApplicantTokenDto } from './dto/current-applicant-token.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private applicantRepository: Repository<Applicant>,
    private jwtServce: JwtService
  ) { }

  async create(dto: CreateApplicantDto) {

    const applicant = this.applicantRepository.create(dto);
    applicant.phone = dto.phone;
    applicant.firstName = dto.firstName;
    applicant.lastName = dto.lastName;
    applicant.email = dto.email;
    applicant.type = dto.type;

    return this.applicantRepository.save(applicant);
  }

  async getAll(dto: GetAllApplicantDto) {
    const applicant = await this.applicantRepository.find({
      take: dto.limit,
      skip: dto.offset
    });

    return applicant;
  }

  async getByPhone(phone: string) {
    try {
      const applicant = await this.applicantRepository.findOneOrFail({
        where: {
          "phone": phone
        }
      });

      return applicant;
    } catch (e) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
  }

  async getOne(userId: number) {
    try {
      const applicant = await this.applicantRepository.findOneOrFail(userId)

      return applicant
    } catch (e) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
  }

  async getCurrent(currentApplicantTokenDto: CurrentApplicantTokenDto) {
    const decodeToken = await this.decodeToken(currentApplicantTokenDto)
    const applicant = this.getOne(decodeToken.id);

    return applicant;
  }

  async updateCurrent(currentApplicantTokenDto: CurrentApplicantTokenDto, updateApplicantDto: UpdateApplicantDto) {
    const decodeToken = await this.decodeToken(currentApplicantTokenDto)
    try {
      const applicant = await this.applicantRepository.findOneOrFail(decodeToken.id);
      applicant.firstName = updateApplicantDto.firstName;
      applicant.lastName = updateApplicantDto.lastName;
      applicant.phone = updateApplicantDto.phone;
      applicant.email = updateApplicantDto.email;

      await this.applicantRepository.save(applicant)

      return applicant;

    } catch (e) {
      throw new HttpException('Пользователь не обновлен', HttpStatus.BAD_REQUEST);
    }
  }

  private async decodeToken(currentApplicantTokenDto: CurrentApplicantTokenDto) {
    try {
      const bearer = currentApplicantTokenDto.authorization.split(' ')[0];
      const token = currentApplicantTokenDto.authorization.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }

      const decodeToken = this.jwtServce.verify(token);

      return decodeToken;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }
  }
}
