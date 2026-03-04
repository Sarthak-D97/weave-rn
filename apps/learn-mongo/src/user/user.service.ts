import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(): Promise<User> {
    const user = new this.userModel({
      name: 'sarthak',
      address: {
        street: 'near hello',
        city: 'mumbai',
      },
    });
    return user.save();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
