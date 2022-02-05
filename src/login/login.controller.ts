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
  import { UserCreateDto, UserUpdateDto, UserLoginDto } from 'tools/dtos/user.dto';
  import { FilterModel } from 'tools/models/filter.model';
  import { UserModel } from 'tools/models/user.model';
import { LoginService } from './login.service';
  
  
  @Controller('login')
  // custom filter exception handler declared here
  //@UseFilters(AllExceptionFilter)
  export class LoginController {
    constructor(private loginService: LoginService) {}
  
    @Post()
    async createUser(@Body() body: UserLoginDto): Promise<UserModel> {
      return await this.loginService.loginUser(body);
    }
  
   
  }
  