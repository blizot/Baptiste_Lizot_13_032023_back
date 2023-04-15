import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  startDate: { type: String, required: true },
  department: { type: String, required: true },
  birthDate: String,
  addressStreet: String,
  addressCity: String,
  addressState: String,
  addressZipCode: String,
});

export interface Employee extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  startDate: string;
  department: string;
  birthDate: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
}
