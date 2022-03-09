import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageMetaDto } from '../components/paginated/dto/page-meta.dto';
import { PaginatedDto } from '../components/paginated/dto/paginated-dto';
import { IdDto } from '../dto/id.dto';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { GetAllUserTypeDto } from './dto/get-all-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { UserType } from './user-type.entity';

@Injectable()
export class UserTypeService {
  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
  ) { }

  async create(createUserTypeDto: CreateUserTypeDto) {

    const userType = this.userTypeRepository.create(createUserTypeDto);
    userType.name = createUserTypeDto.name;

    return await this.userTypeRepository.save(userType);
  }

  async getAll(getAllUserTypeDto: GetAllUserTypeDto) {
    const [userType, total] = await this.userTypeRepository.findAndCount({
      take: getAllUserTypeDto.limit,
      skip: getAllUserTypeDto.offset
    });

    const pageMetaDto = new PageMetaDto(total, getAllUserTypeDto.limit, getAllUserTypeDto.offset)

    return new PaginatedDto(userType, pageMetaDto)
  }

  async getOne(userTypeId: number) {
    try {
      const userType = await this.userTypeRepository.findOneOrFail(userTypeId);

      return userType;
    } catch (e) {
      throw new HttpException('User type is not found', HttpStatus.BAD_REQUEST);
    }
  }

  async updateOne(updateUserTypeDto: UpdateUserTypeDto, idDto: IdDto) {
    try {
      const userType = await this.userTypeRepository.findOneOrFail(idDto);
      userType.name = updateUserTypeDto.name;

      await this.userTypeRepository.save(userType)

      return userType;

    } catch (e) {
      throw new HttpException('User type not updated', HttpStatus.BAD_REQUEST);
    }
  }
}
