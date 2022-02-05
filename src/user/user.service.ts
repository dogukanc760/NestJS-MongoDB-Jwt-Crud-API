import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResourceService } from 'libs/services/resource.service';
import { Model } from 'mongoose';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { AuditModel } from 'tools/models/audit.model';
import { UserModel } from 'tools/models/user.model';
import environment from 'tools/environment/environment';

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const hashText = environment.hashText;

@Injectable()
export class UserService extends ResourceService<
  UserModel,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(@InjectModel('User') useRMongo: Model<UserModel>) {
    super(useRMongo);
  }

  async convertToHash(value: string) {
    let hashPwd;
    await bcrypt.hash(`${hashText}${value}`, saltRounds).then(hash => {
      hashPwd = hash;
    });
    return await hashPwd;
  }

  async compareHashes(password, hashed) {
    const match = await bcrypt.compareSync(`${hashText}${password}`, hashed);
    return await match;
  }
  // constructor(
  //   @InjectModel('User') private readonly userMongo: Model<UserModel>,
  // ) {}

  // async create(user: UserCreateDto): Promise<UserModel> {
  //   const audit = new AuditModel();
  //   audit.active = true;
  //   audit.createdBy = 'Admin';
  //   audit.createdDate = new Date();

  //   const createdUser = new this.userMongo({ ...user, ...audit });
  //   return createdUser.save();
  // }

  // async findAll(): Promise<UserModel[]> {
  //   return await this.userMongo.find().exec();
  // }

  // async findOne(id: string): Promise<UserModel[]> {
  //   return await this.userMongo.find({ _id: id }).exec();
  // }

  // async delete(id: string): Promise<UserModel> {
  //     return await this.userMongo.findByIdAndDelete({_id:id}).exec();
  // }

  // async update(id: string, user:UserUpdateDto): Promise<UserModel> {
  //   let newModel = this.userMongo.findOne({_id:id}).exec();
  //   newModel = {...newModel,...user};

  //   return await this.userMongo.findByIdAndUpdate(id,newModel,{new:true}).exec();
  // }
}
