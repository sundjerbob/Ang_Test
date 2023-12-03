// employee.module.ts

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeTableComponent} from './employee-table/employee-table.component.';
import {EmployeeService} from "./employee.service";

@NgModule(
  {
    declarations: [
      EmployeeTableComponent,
    ],

    imports: [
      CommonModule,
      HttpClientModule
    ],

    providers: [EmployeeService],

    exports: [
      EmployeeTableComponent
    ],
  }
)
export class EmployeeModule {
}
