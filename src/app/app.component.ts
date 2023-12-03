import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./employee/service/employee.service";
import {Employee} from "./employee/model/employee.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];

  // Inject EmployeeService in the constructor
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {

    // Call the service method to get employee data to drill into data render components (table, chart)
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }
}
