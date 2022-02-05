import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'tools/models/user.model';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';


@Module({
    imports:[MongooseModule.forFeature([{name:'User', schema:UserSchema}])],
    controllers: [LoginController],
    providers: [LoginService, UserService],
})
export class LoginModule {}
