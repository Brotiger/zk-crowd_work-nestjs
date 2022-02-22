import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Applicant } from './applicant.entity'
import { CreateApplicantDto } from './dto/create-applicant.dto'
import { GetAllApplicantDto } from './dto/get-all-applicant.dto'

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private applicantRepository: Repository<Applicant>,
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
    const applicant = await this.applicantRepository.findOne({
      where: {
        "phone": phone
      }
    })

    return applicant
  }
}
