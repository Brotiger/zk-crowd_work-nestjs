import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { OneTimeCodeService } from './one-time-code.service'
import { CreateOneTimeCodeDto } from './dto/create-one-time-code';

@ApiTags('Получение одноразового кода')
@Controller('one-time-code')
export class OneTimeCodeController {
  constructor(private readonly oneTimeCodeService: OneTimeCodeService) { }

  @ApiOperation({ summary: 'Создание одноразового кода' })
  @ApiResponse({ status: 201, description: 'Код будет отправлен по СМС на указанный номер' })
  @Post()
  async create(@Body() createOneTimeCodeDto: CreateOneTimeCodeDto) {
    return await this.oneTimeCodeService.generate(createOneTimeCodeDto)
  }
}
