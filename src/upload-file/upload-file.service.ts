import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { CurrentApplicantTokenDto } from '../applicant/dto/current-applicant-token.dto';
import { NewFile } from './dto/new-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFile } from './upload-file.entity';
import { Repository } from 'typeorm';
import { ApplicantService } from '../applicant/applicant.service';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>,
    private applicantService: ApplicantService
  ) { }

  async create(file: Express.Multer.File, currentApplicantTokenDto: CurrentApplicantTokenDto) {
    try {
      const fileName = uuid.v4() + path.extname(file.originalname);
      const filePath = path.resolve(__dirname, '..', 'static')

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer)

      //Вносить запись в бд

      const newFile = new NewFile(fileName)

      return newFile;
    } catch (e) {
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}