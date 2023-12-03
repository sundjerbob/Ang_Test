// employee-table.component.ts
import { Component, Input } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];

  editLabel = 'Edit';

  // Constructor to receive the list of Employee model objects
  constructor() { }

  // ngOnInit is not needed in this case since the component receives data through Input
}
