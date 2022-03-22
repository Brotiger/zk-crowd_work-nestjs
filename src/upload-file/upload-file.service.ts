import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { ResponseUploadFileDto } from './response-dto/response-upload-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFile } from './upload-file.entity';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>,
    private readonly configService: ConfigService
  ) { }

  async create(file: Express.Multer.File) {
    if (!file || !('size' in file) || !('mimetype' in file)) {
      throw new HttpException('This is not a file', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (file.size > this.configService.get('max_file_size') * 1024) {
      throw new HttpException(`The file should not weigh more than ${this.configService.get('max_file_size')} kilobytes`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const [type, ext] = file.mimetype.split('/');

      if (!(this.configService.get('image_ext').includes(ext))) {
        throw new Error(`The file must be of the following type: ${this.configService.get('image_ext').join(', ')}`);
      }
    } catch {
      throw new HttpException(`The file must be of the following type: ${this.configService.get('image_ext').join(', ')}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

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

      const uploadFileDto = new ResponseUploadFileDto(dbFile.hash);

      return uploadFileDto;
    } catch (e) {
      throw new HttpException('Writing file error', HttpStatus.INTERNAL_SERVER_ERROR);
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