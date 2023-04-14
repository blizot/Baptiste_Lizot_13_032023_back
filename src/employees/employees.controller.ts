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
  listAllEmployees() {
    return this.employeesService.listAllEmployees();
  }

  @Post()
  createEmployee(
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
    return this.employeesService.createEmployee(completeBody);
  }

  @Get(':id')
  getEmployee(@Param('id') id: string) {
    return this.employeesService.getEmployee(id);
  }

  @Patch(':id')
  editEmployee(
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
    return this.employeesService.editEmployee(id, completeBody);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeesService.deleteEmployee(id);
  }
}
