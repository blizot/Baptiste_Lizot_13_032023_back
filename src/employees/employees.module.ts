import { Module } from '@nestjs/common';
import { EmployeesController } from './controller/employees.controller';

@Module({
  controllers: [EmployeesController],
})
export class EmployeesModule {}
