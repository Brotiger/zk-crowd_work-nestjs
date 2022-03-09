import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CheckCodeService } from '../check-code/check-code.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private checkCodeService: CheckCodeService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: any
  ) { }

  async login(loginUserDto: LoginUserDto) {
    await this.checkCodeService.checkCode(loginUserDto.phone, loginUserDto.code);

    const user = await this.validateUser(loginUserDto);

    await this.deleteChacheCode(loginUserDto.phone);

    return this.generateToken(user);
  }

  async registration(createUserDto: CreateUserDto) {
    await this.checkCodeService.checkCode(createUserDto.phone, createUserDto.code);

    const candidate = await this.userService.getByPhone(createUserDto.phone);

    if (candidate) {
      throw new HttpException('User with this number is already registered', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.create(createUserDto);

    await this.deleteChacheCode(createUserDto.phone);

    return this.generateToken(user);
  }

  private async deleteChacheCode(phone: string) {
    let cacheManagerKey = `sms_already_sent_${phone}`;
    await this.cacheManager.del(cacheManagerKey);

    cacheManagerKey = `code_${phone}`;
    await this.cacheManager.del(cacheManagerKey);
  }

  private async generateToken(appicant) {
    const payload = { type: appicant.type, id: appicant.id }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.getByPhone(loginUserDto.phone);

    if (user) {
      return user;
    }

    throw new HttpException('User is not found', HttpStatus.FORBIDDEN);
  }
}
