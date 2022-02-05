import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { UserLoginDto } from 'tools/dtos/user.dto';
import * as jwt from 'jsonwebtoken';
import environment from 'tools/environment/environment';

import { UserModel } from 'tools/models/user.model';




@Injectable()
export class LoginService {
  constructor(@InjectModel('User') private readonly useRMongo: Model<UserModel>, private userService:UserService) {}
  
  async loginUser(user:UserLoginDto):Promise<any>{
      try {
          const existUser =  this.useRMongo.findOne({
              email:user.email
          }).exec();

         if((await existUser).email){
             let checkPwd;
             await this.userService.compareHashes(user.password,(await existUser).password).then(resp=>{
                if(resp){
                    checkPwd =true;
                }else{
                    checkPwd = false;
                }                   
             });
             if(checkPwd){
                 const authJWT = jwt.sign({user:existUser},environment.jwtText);
                 const data = {...existUser, ...authJWT};
                 return await {success:true ,value:data}
             }else{
                 return await {success:false, response:'wrong pass or username'};
             }
         }
         else{
            return await {success:false, response:'user does not exist'};
         }
      } catch (ex) {
        return await {success:false, response:'something went wrong'};
      }
  }
  
}
