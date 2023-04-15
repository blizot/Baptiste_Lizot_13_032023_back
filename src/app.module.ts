import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    EmployeesModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/hrnetDB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
