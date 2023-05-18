import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./users.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
  async createUser(username: string, password: string): Promise<any> {
    let user=await this.userModel.create({
      username,
      password,
    });
    return {
      username:user.username,
      _id: user._id
    }
  }
  async getUser(query: object ): Promise<User> {
    return this.userModel.findOne(query);
  }
}
