import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { AllExceptionFilter } from 'libs/filters/all-exception.filters';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { FilterModel } from 'tools/models/filter.model';
import { TotalService } from './total.service';

@Controller('total')
export class TotalController {
  constructor(private totalService: TotalService) {}

  @Get()
  async getAllTotal() {
    return await this.totalService.findAll();
  }
}
