import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { AllExceptionFilter } from 'libs/filters/all-exception.filters';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { FilterModel } from 'tools/models/filter.model';
import { UserModel } from 'tools/models/user.model';
import { UserService } from './user.service';
import {Roles} from 'libs/decorators/role.decorator';

@Controller('user')
// custom filter exception handler declared here
//@UseFilters(AllExceptionFilter)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Roles('admin')
  async createUser(@Body() body: UserCreateDto): Promise<UserModel> {
    body.password = await this.userService.convertToHash(body.password);
    return await this.userService.create(body);
  }

  @Get()
  async getAllUsers(@Query() query:FilterModel): Promise<UserModel[]> {
    return await this.userService.findAll(query);
  }

  @Get(':id')
  @Roles('developer')
  async getUser(@Param() params): Promise<UserModel[]> {
    return await this.userService.findOne(params.id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserModel> {
    return await this.userService.update(id, userUpdateDto);
  }

  @Delete(':id')
  @Roles('operator')
  async removeUser(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.delete(id);
  }
}
