import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { OneTimeCodeService } from './one-time-code.service'
import { CreateOneTimeCodeDto } from './dto/create-one-time-code';

@ApiTags('One-time code')
@Controller('one-time-code')
export class OneTimeCodeController {
  constructor(private readonly oneTimeCodeService: OneTimeCodeService) { }

  @ApiOperation({ summary: 'Getting one-time code' })
  @ApiResponse({ status: 201, description: 'The code will be sent by SMS to the specified number' })
  @Post()
  async create(
    @Body() createOneTimeCodeDto: CreateOneTimeCodeDto
  ) {
    return await this.oneTimeCodeService.generate(createOneTimeCodeDto)
  }
}
