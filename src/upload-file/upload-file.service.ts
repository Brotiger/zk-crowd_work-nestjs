import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { CurrentUserTokenDto } from '../user/dto/current-user-token.dto';
import { NewFile } from './dto/new-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFile } from './upload-file.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>,
    private userService: UserService
  ) { }

  async create(file: Express.Multer.File, currentUserTokenDto: CurrentUserTokenDto) {
    try {
      const fileName = uuid.v4() + path.extname(file.originalname);
      const filePath = path.resolve(__dirname, '..', 'static')

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      const decodeToken = await this.userService.decodeToken(currentUserTokenDto);

      const uploadFile = await this.uploadFileRepository.create();
      uploadFile.name = fileName;
      uploadFile.user = decodeToken.id;

      await this.uploadFileRepository.save(uploadFile);

      const newFile = new NewFile(fileName);

      return newFile;
    } catch (e) {
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}