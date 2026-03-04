import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Student } from './student.schema';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @Post()
  async create(@Body() body: Partial<Student>) {
    return this.studentService.createStudent(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<Student>) {
    return this.studentService.updateStudent(id, body);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() body: Partial<Student>) {
    return this.studentService.patchStudent(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
