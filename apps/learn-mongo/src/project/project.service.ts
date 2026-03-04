import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { Developer } from './schemas/developer.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Developer.name) private developerModel: Model<Developer>,
  ) {}

  async seed(): Promise<{ dev1: Developer; dev2: Developer }> {
    const [projectA, projectB] = await Promise.all([
      this.projectModel.create({ title: 'Project A' }),
      this.projectModel.create({ title: 'Project B' }),
    ]);
    const [dev1, dev2] = await Promise.all([
      this.developerModel.create({
        name: 'Dev 1',
        project: [projectA._id, projectB._id],
      }),
      this.developerModel.create({ name: 'Dev 2', project: [projectA._id] }),
    ]);

    await Promise.all([
      this.projectModel.findByIdAndUpdate(projectA._id, {
        $set: { developer: [dev1._id, dev2._id] },
      }),
      this.projectModel.findByIdAndUpdate(projectB._id, {
        $set: { developer: [dev1._id] },
      }),
    ]);
    return { dev1, dev2 };
  }
  async getDevelopers(): Promise<Developer[]> {
    return this.developerModel.find().populate('project').lean();
  }
  async getProjects(): Promise<Project[]> {
    return this.projectModel.find().populate('developer').lean();
  }
}
