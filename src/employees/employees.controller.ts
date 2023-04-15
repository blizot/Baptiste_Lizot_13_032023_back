import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { EmployeesService } from './employees.service';

import * as employees from './mock/employees.json';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('mock')
  getEmployeesMock(): object {
    return employees;
  }

  @Get()
  async listAllEmployees() {
    const employees = await this.employeesService.listAllEmployees();
    return employees as object;
  }

  @Post()
  async createEmployee(
    @Body()
    completeBody: {
      firstName: string;
      lastName: string;
      startDate: string;
      department: string;
      birthDate: string;
      addressStreet: string;
      addressCity: string;
      addressState: string;
      addressZipCode: string;
    },
  ) {
    const newEmployee = await this.employeesService.createEmployee(
      completeBody,
    );
    return newEmployee as object;
  }

  @Get(':id')
  async getEmployee(@Param('id') id: string) {
    const employee = await this.employeesService.getEmployee(id);
    return employee as object;
  }

  @Patch(':id')
  async editEmployee(
    @Param('id') id: string,
    @Body()
    completeBody: {
      firstName: string;
      lastName: string;
      startDate: string;
      department: string;
      birthDate: string;
      addressStreet: string;
      addressCity: string;
      addressState: string;
      addressZipCode: string;
    },
  ) {
    const editedEmployee = await this.employeesService.editEmployee(
      id,
      completeBody,
    );
    return editedEmployee as object;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    return await this.employeesService.deleteEmployee(id);
  }
}
