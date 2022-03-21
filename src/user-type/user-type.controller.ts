import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginated } from '../components/paginated/api-paginated';
import { IdDto } from '../dto/id.dto';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { GetAllUserTypeDto } from './dto/get-all-user-type.dto';
import { GetOneUserTypeDto } from './dto/get-one-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { UserType } from './user-type.entity';
import { UserTypeService } from './user-type.service';

@ApiTags('User type')
@Controller('user-type')
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) { }

  @ApiOperation({ summary: "Create user type" })
  @ApiResponse({ status: 201, type: UserType })
  @Post()
  create(@Query() createUserTypeDto: CreateUserTypeDto) {
    return this.userTypeService.create(createUserTypeDto);
  }

  @ApiOperation({ summary: "Get user types list" })
  @ApiPaginated(UserType)
  @Get()
  getAll(@Query() getAllUserTypeDto: GetAllUserTypeDto) {
    return this.userTypeService.getAll(getAllUserTypeDto);
  }

  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({ status: 200, type: UserType })
  @Get("/:id")
  getOne(@Param() getOneUserTypeDto: GetOneUserTypeDto) {
    return this.userTypeService.getOne(getOneUserTypeDto.id);
  }

  @ApiOperation({ summary: "Update information about userType" })
  @ApiResponse({ status: 200, type: UserType })
  @Put("/:id")
  update(
    @Param() idDto: IdDto,
    @Body() updateUserTypeDto: UpdateUserTypeDto) {
    return this.userTypeService.updateOne(updateUserTypeDto, idDto);
  }
}
