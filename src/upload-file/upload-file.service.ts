import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { UploadFileDto } from './dto/upload-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFile } from './upload-file.entity';
import { Repository } from 'typeorm';
import * as md5 from 'md5';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>,
  ) { }

  async create(file: Express.Multer.File) {
    try {
      const hash = md5(file.buffer);

      let fileName = uuid.v4() + path.extname(file.originalname);

      let dbFile = await this.getByHash(hash);


      if (!dbFile) {
        const filePath = path.resolve(__dirname, '..', 'static');

        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }

        fs.writeFileSync(path.join(filePath, fileName), file.buffer);

        const uploadFile = await this.uploadFileRepository.create();
        uploadFile.name = fileName;
        uploadFile.hash = hash;

        dbFile = await this.uploadFileRepository.save(uploadFile);
      }

      const uploadFileDto = new UploadFileDto(dbFile.hash);

      return uploadFileDto;
    } catch (e) {
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getByHash(hash: string) {
    try {
      const uploadFile = await this.uploadFileRepository.findOneOrFail({
        where: {
          "hash": hash
        }
      });

      return uploadFile;
    } catch (e) {
      return false;
    }
  }
}