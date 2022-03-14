import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetAllUserDto } from './dto/get-all-user.dto';
import { CurrentUserTokenDto } from './dto/current-user-token.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatedDto } from '../components/paginated/dto/paginated-dto';
import { PageMetaDto } from '../components/paginated/dto/page-meta.dto';
import { UserTypeService } from '../user-type/user-type.service';
import { decode } from 'punycode';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtServce: JwtService,
    private userTypeService: UserTypeService
  ) { }

  async create(createUserDto: CreateUserDto) {
    await this.userTypeService.getOne(createUserDto.type.id)

    const user = this.userRepository.create(createUserDto);
    user.phone = createUserDto.phone;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.type = createUserDto.type;

    return await this.userRepository.save(user);
  }

  async getAll(dto: GetAllUserDto) {
    const [user, total] = await this.userRepository.findAndCount({
      take: dto.limit,
      skip: dto.offset,
      relations: ["type"]
    });

    const pageMetaDto = new PageMetaDto(total, dto.limit, dto.offset)

    return new PaginatedDto(user, pageMetaDto)
  }

  async getByPhone(phone: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          "phone": phone
        }
      });

      return user;
    } catch (e) {
      return false;
    }
  }

  async getOne(userId: number) {
    try {
      const user = await this.userRepository.findOneOrFail(userId, { relations: ["type"] });

      return user;
    } catch (e) {
      throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
    }
  }

  async getCurrent(currentUserTokenDto: CurrentUserTokenDto) {
    const decodeToken = await this.decodeToken(currentUserTokenDto)
    const user = this.getOne(decodeToken.id);

    return user;
  }

  async updateCurrent(currentUserTokenDto: CurrentUserTokenDto, updateUserDto: UpdateUserDto) {
    const decodeToken = await this.decodeToken(currentUserTokenDto)
    try {
      const user = await this.userRepository.findOneOrFail(decodeToken.id);
      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
      user.phone = updateUserDto.phone;
      user.email = updateUserDto.email;

      await this.userRepository.save(user)

      return user;

    } catch (e) {
      throw new HttpException('User not updated', HttpStatus.BAD_REQUEST);
    }
  }

  async decodeToken(currentUserTokenDto: CurrentUserTokenDto) {
    try {
      const bearer = currentUserTokenDto.authorization.split(' ')[0];
      const token = currentUserTokenDto.authorization.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User not authorized' });
      }

      const decodeToken = this.jwtServce.verify(token);

      return decodeToken;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User not authorized' });
    }
  }
}
