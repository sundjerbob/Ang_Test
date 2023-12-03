import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {

    return this.http.get<any[]>(this.apiUrl).pipe(
      map(workShifts => {
        const employeesMap = new Map<string, Employee>();

        // Calculate total work time for each employee
        workShifts.forEach(workShift => {
          const employeeName = workShift.EmployeeName;

          // Skip work shifts with null or empty employeeName and shifts where DeletedOn attribute is defined indicating the shift should not be counted in
          if (employeeName == null || employeeName.lenght === 0 || workShift.DeletedOn !== null) {
            return;
          }

          const workTime = this.calculateTimeWindowInMinutes(workShift.StarTimeUtc, workShift.EndTimeUtc);


          if (!employeesMap.has(employeeName)) {
            employeesMap.set(employeeName, { employeeName: employeeName, totalTimeWorked: 0 });
          }

          employeesMap.get(employeeName)!.totalTimeWorked += workTime;

        });


        // Convert Map values to an array of Employee objects
        const res = Array.from(employeesMap.values());

        // Convert totalTimeWorked sum of minutes into whole number of hours
        res.forEach(employee => employee.totalTimeWorked = Math.floor(employee.totalTimeWorked / 60))

        // Sort the list by total time worked
        return res.sort((employee1, employee2) => employee1.totalTimeWorked > employee2.totalTimeWorked ? -1 : 1);
      })
    );
  }


  private calculateTimeWindowInMinutes(startTime: string, endTime: string): number {
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);

    // Check if end time is before start time
    if (endDateTime.getTime() < startDateTime.getTime()) {
      // Invalid time window, return 0 minutes
      return 0;
    }

    // Calculate time window in milliseconds
    const timeDifferenceMs = endDateTime.getTime() - startDateTime.getTime();

    // Convert milliseconds to minutes
    return timeDifferenceMs / (1000 * 60);
  }


}
