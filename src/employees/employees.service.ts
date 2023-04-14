import { Injectable, NotFoundException } from '@nestjs/common';

import { Employee } from './employee.model';

@Injectable()
export class EmployeesService {
  private employees: Employee[] = [];

  private findEmployee(id: string): {
    employee: Employee;
    employeeIndex: number;
  } {
    const employeeIndex = this.employees.findIndex(
      (employee) => employee.id === id,
    );
    const employee = this.employees[employeeIndex];

    if (!employee) {
      throw new NotFoundException("Employee ID doesn't exists.");
    }

    return { employee, employeeIndex };
  }

  listAllEmployees() {
    return [...this.employees];
  }

  createEmployee(body: {
    firstName: string;
    lastName: string;
    startDate: string;
    department: string;
    birthDate: string;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressZipCode: string;
  }) {
    const newId = `${parseInt(Math.random().toString().slice(2)) + Date.now()}`;

    if (!body.birthDate) body.birthDate = 'NO_DATA';
    if (!body.addressStreet) body.addressStreet = 'NO_DATA';
    if (!body.addressCity) body.addressCity = 'NO_DATA';
    if (!body.addressState) body.addressState = 'NO_DATA';
    if (!body.addressZipCode) body.addressZipCode = 'NO_DATA';

    const newEmployee = new Employee(
      newId,
      body.firstName,
      body.lastName,
      body.startDate,
      body.department,
      body.birthDate,
      body.addressStreet,
      body.addressCity,
      body.addressState,
      body.addressZipCode,
    );

    this.employees.push(newEmployee);
    return newEmployee;
  }

  getEmployee(id: string) {
    const { employee } = this.findEmployee(id);
    return { ...employee };
  }

  editEmployee(
    id: string,
    body: {
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
    const { employee, employeeIndex } = this.findEmployee(id);
    const employeeEdit = { ...employee };

    if (body.firstName) employeeEdit.firstName = body.firstName;
    if (body.lastName) employeeEdit.lastName = body.lastName;
    if (body.startDate) employeeEdit.startDate = body.startDate;
    if (body.department) employeeEdit.department = body.department;
    if (body.birthDate) employeeEdit.birthDate = body.birthDate;
    if (body.addressStreet) employeeEdit.addressStreet = body.addressStreet;
    if (body.addressCity) employeeEdit.addressCity = body.addressCity;
    if (body.addressState) employeeEdit.addressState = body.addressState;
    if (body.addressZipCode) employeeEdit.addressZipCode = body.addressZipCode;

    this.employees[employeeIndex] = employeeEdit;
    return employeeEdit;
  }

  deleteEmployee(id: string) {
    const { employeeIndex } = this.findEmployee(id);
    this.employees.splice(employeeIndex, 1);
    return 'Employee deleted successfully';
  }
}
