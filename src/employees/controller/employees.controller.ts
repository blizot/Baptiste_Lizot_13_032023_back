import { Controller, Get, Post } from '@nestjs/common';
import * as employees from '../mock/employees.json';

@Controller('employees')
export class EmployeesController {
  @Get()
  findAll(): object {
    return employees;
  }

  @Post()
  create(): string {
    return 'Create employee';
  }
}
