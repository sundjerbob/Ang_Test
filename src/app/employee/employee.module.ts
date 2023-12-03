// employee.module.ts

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeTableComponent} from './components/employee-table/employee-table.component.';
import {PieChartComponent} from "./components/pie-chart/pie-chart.component";
import {EmployeeService} from "./service/employee.service";

@NgModule(
  {
    declarations: [
      EmployeeTableComponent,
      PieChartComponent
    ],

    imports: [
      CommonModule,
      HttpClientModule
    ],

    providers: [EmployeeService],

    exports: [
      EmployeeTableComponent,
      PieChartComponent
    ],
  }
)
export class EmployeeModule {
}
