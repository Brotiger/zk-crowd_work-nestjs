import { Controller, Get, Param, Query, Headers, UseGuards, Put, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { GetAllUserDto } from './dto/get-all-user.dto';
import { GetOneUserDto } from './dto/get-one-user.dto';
import { CurrentUserTokenDto } from './dto/current-user-token.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiPaginated } from '../components/paginated/api-pagitated';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: "Get information about current user" })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get('/current')
  @ApiBearerAuth()
  getCurrent(@Headers() currentUserTokenDto: CurrentUserTokenDto) {
    return this.userService.getCurrent(currentUserTokenDto);
  }

  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({ status: 200, type: User })
  @Get("/:id")
  getOne(@Param() getOneUserDto: GetOneUserDto) {
    return this.userService.getOne(getOneUserDto.id);
  }

  @ApiOperation({ summary: "Get users list" })
  @ApiPaginated(User)
  @Get()
  getAll(@Query() getAllUserDto: GetAllUserDto) {
    return this.userService.getAll(getAllUserDto);
  }

  @ApiOperation({ summary: "Update information about current user" })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  updateCurrent(
    @Headers() currentUserTokenDto: CurrentUserTokenDto,
    @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateCurrent(currentUserTokenDto, updateUserDto);
  }
}