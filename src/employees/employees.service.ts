import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Employee } from './employee.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  private async findEmployee(id: string): Promise<Employee> {
    let employee: Employee;
    try {
      employee = await this.employeeModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Invalid Employee ID.');
    }

    if (!employee) {
      throw new NotFoundException("Employee ID doesn't exists.");
    }

    return employee;
  }

  async listAllEmployees() {
    const response = await this.employeeModel.find().exec();
    return response as Employee[];
  }

  async createEmployee(body: {
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
    if (!body.birthDate) body.birthDate = 'NO_DATA';
    if (!body.addressStreet) body.addressStreet = 'NO_DATA';
    if (!body.addressCity) body.addressCity = 'NO_DATA';
    if (!body.addressState) body.addressState = 'NO_DATA';
    if (!body.addressZipCode) body.addressZipCode = 'NO_DATA';

    const newEmployee = new this.employeeModel({
      firstName: body.firstName,
      lastName: body.lastName,
      startDate: body.startDate,
      department: body.department,
      birthDate: body.birthDate,
      addressStreet: body.addressStreet,
      addressCity: body.addressCity,
      addressState: body.addressState,
      addressZipCode: body.addressZipCode,
    });

    const response = await newEmployee.save();
    return response as Employee;
  }

  async getEmployee(id: string) {
    const response = await this.findEmployee(id);
    return response as Employee;
  }

  async editEmployee(
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
    const employeeEdit = await this.findEmployee(id);

    if (body.firstName) employeeEdit.firstName = body.firstName;
    if (body.lastName) employeeEdit.lastName = body.lastName;
    if (body.startDate) employeeEdit.startDate = body.startDate;
    if (body.department) employeeEdit.department = body.department;
    if (body.birthDate) employeeEdit.birthDate = body.birthDate;
    if (body.addressStreet) employeeEdit.addressStreet = body.addressStreet;
    if (body.addressCity) employeeEdit.addressCity = body.addressCity;
    if (body.addressState) employeeEdit.addressState = body.addressState;
    if (body.addressZipCode) employeeEdit.addressZipCode = body.addressZipCode;

    const response = await employeeEdit.save();
    return response as Employee;
  }

  async deleteEmployee(id: string) {
    const response = await this.employeeModel.findByIdAndDelete(id).exec();

    if (response === null) {
      throw new NotFoundException("Employee ID doesn't exists.");
    }

    return 'Employee deleted successfully';
  }
}
