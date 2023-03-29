import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { AllocationComponent } from './allocation/allocation.component';
import { HeaderComponent } from './header.component';
import { AddAllocationComponent } from './allocation/add-allocation/add-allocation.component';
import { AllocationListComponent } from './allocation/allocation-list/allocation-list.component';
import { DatePipe } from '@angular/common';
import { AllocationFormComponent } from './allocation/allocation-form/allocation-form.component';
 
@NgModule({
 declarations: [
   AppComponent,
   EmployeesListComponent,
   EmployeeFormComponent,
   AddEmployeeComponent,
   EditEmployeeComponent,
   AllocationComponent,
   HeaderComponent,
   AddAllocationComponent,
   AllocationListComponent,
   AllocationFormComponent
 ],
 imports: [
   BrowserModule,
   AppRoutingModule,
   HttpClientModule,
   ReactiveFormsModule 
 ],
 providers: [DatePipe],
 bootstrap: [AppComponent]
})
export class AppModule { }
