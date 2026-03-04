import { Controller, Get, Post } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create() {
    return this.studentsService.createStudent();
  }

  @Get()
  fetAll() {
    return this.studentsService.findAll();
  }
}
