import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Student } from 'src/student/student.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }
  @Post()
  async create(@Body() body: Partial<Student>) {
    return this.userService.createUser();
  }
}
