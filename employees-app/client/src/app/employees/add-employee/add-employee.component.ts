import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../employee';
import { EmployeeService } from '../../employee.service';
 
@Component({
 selector: 'app-add-employee',
 templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent {
 constructor(
   private router: Router,
   private employeeService: EmployeeService
 ) { }
 
 addEmployee(employee: Employee) {
   this.employeeService.createEmployee(employee)
     .subscribe({
       next: () => {
         this.router.navigate(['/employees']);
       },
       error: (error) => {
         alert("Failed to create employee");
         console.error(error);
       }
     });
 }
}