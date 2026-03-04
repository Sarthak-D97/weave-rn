import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';
@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}
  //GET
  // getAllStudents() {
  //     return this.students;
  // }
  // getStudentById(id: number) {
  //     const student = this.students.find((s) => s.id === id);
  //     if (!student) throw new NotFoundException('Student not Found!');
  //     return student;
  // }
  async getAllStudents(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }
  async getStudentById(id: string) {
    const student = await this.studentModel.findById(id).exec();
    if (!student) throw new NotFoundException('Student not Found!');
    return student;
  }
  //POST
  //createStudent(data: {name:string; age:number}){
  // const newStudent = {
  //     id: Date.now(),
  //     ...data,
  // };
  // this.students.push(newStudent);
  // return newStudent;
  // }
  async createStudent(data: Partial<Student>): Promise<Student> {
    const newStudent = new this.studentModel(data);
    return newStudent.save();
  }
  //PUT
  // updateStudent(id: number, data: Partial<Student>) {
  //     const index = this.students.findIndex((s) => s.id === id);
  //     if (index === -1) throw new NotFoundException('Student not found!');
  //     this.students[index] = { id, ...data };
  //     return this.students[index];
  // }
  async updateStudent(id: string, data: Partial<Student>): Promise<Student> {
    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(
        id,
        {
          name: data.name ?? null,
          age: data.age ?? null,
          email: data.email ?? null,
        },
        { overwrite: true, new: true },
      )
      .exec();
    if (!updatedStudent) throw new NotFoundException('Student not found!');
    return updatedStudent;
  }
  //Patch
  // patchStudent(id: number, data: Partial<Student>) {
  //     const student = this.getStudentById(id);
  //     Object.assign(student, data);
  //     return student;
  // }
  async patchStudent(id: string, data: Partial<Student>): Promise<Student> {
    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedStudent) throw new NotFoundException('Student not found!');
    return updatedStudent;
  }
  //DELETE
  // deleteStudent(id: number) {
  //     const index = this.students.findIndex((s) => s.id === id);
  //     if (index === -1) throw new NotFoundException('Student not found!');
  //     const deleted = this.students.splice(index, 1)
  //     return { message: 'Student Deleted', student: deleted[0]};
  // }

  // async deleteStudent(id: string):Promise<Student | null>  {
  async deleteStudent(id: string) {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();
    if (!deletedStudent) throw new NotFoundException('Student not found!');
    return { message: 'Student Deleted', student: deletedStudent };
  }
}
