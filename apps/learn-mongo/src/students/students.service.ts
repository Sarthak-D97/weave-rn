import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Students } from './schemas/students.schema';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Students.name) private studentsModel: Model<Students>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}
  async createStudent(): Promise<Students> {
    const profile = await new this.profileModel({
      age: 20,
      qualification: 'masters',
    }).save();
    const students = await new this.studentsModel({
      name: 'sarthak',
      profile: profile._id,
    });
    return students.save();
  }
  async findAll(): Promise<Students[]> {
    return this.studentsModel.find().populate('profile').exec();
  }
}
