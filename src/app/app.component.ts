import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./employee/employee.service";
import {Employee} from "./employee/employee.model";

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

    // Call the service method to get employee data
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }
}
