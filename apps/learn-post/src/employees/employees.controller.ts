import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';
import { SupabaseAuthGuard } from 'src/auth/supabase_auth/supabase_auth.guard';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    async createemployee(@Body() Body: Partial<Employee>): Promise<Employee> {
        return this.employeesService.create(Body);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get()
    async getAllEmployees(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }
    
    @Get('search')
    async searchEmployee(@Query('name') name?: string,
        @Query('department') department?: string): Promise<Employee[]> {
        return this.employeesService.search({ name, department });
    }
    @Get(':id')
    async getEmployee(@Param('id') id: number): Promise<Employee> {
        return this.employeesService.findOne(id);
    }

    @Put(':id')
    async updateEmployee(@Param('id') id: number, @Body() Body: Partial<Employee>): Promise<Employee> {
        return this.employeesService.update(id, Body);
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: number): Promise<{ message: string }> {
        return this.employeesService.delete(id);
    }

}
