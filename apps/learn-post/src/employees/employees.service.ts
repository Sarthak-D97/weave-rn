import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './employees.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>,
    ){}
    async create(employeeData: Partial<Employee>): Promise<Employee> {
        const employee = this.employeesRepository.create(employeeData);
        return this.employeesRepository.save(employee);
    }
    async findAll():Promise<Employee[]>{
        return this.employeesRepository.find();
    }
    async findOne(id:number):Promise<Employee>{
        const employee = await this.employeesRepository.findOneBy({id});
        if(!employee){
            throw new NotFoundException(`Employee with id ${id} not found`);
        }
        return employee;
    }
    async update(id:number, employeeData: Partial<Employee>):Promise<Employee>{
        const employee = await this.employeesRepository.findOneBy({id});
        if(!employee){
            throw new NotFoundException(`Employee with id ${id} not found`);
        }
         const updatedEmployee = Object.assign(employee,employeeData);
         return this.employeesRepository.save(updatedEmployee);
        // const updatedEmployee = await this.employeesRepository.save({...employee, ...employeeData});
        // return updatedEmployee;
    }

    async delete(id:number):Promise<{message:string}>{
        const result = await this.employeesRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException(`Employee with id ${id} not found`);
        }
        return {message: `Employee with id ${id} deleted successfully`};
    }
    async search(filters: {name?:string; department?:string}):Promise<Employee[]>{
        const query = this.employeesRepository.createQueryBuilder('employee');
        if(filters.name){
            query.andWhere('employee.name ILIKE :name', {name: `%${filters.name}%`});
        }
        if(filters.department){
            query.andWhere('employee.department = :dept', {dept: `${filters.department}`});
        }
        return query.getMany();
    }
}
