import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component'; 
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component'; 
import { AllocationComponent } from './allocation/allocation.component';
import { AddAllocationComponent } from './allocation/add-allocation/add-allocation.component';
import { EditAllocationComponent } from './allocation/edit-allocation/edit-allocation.component';
 
const routes: Routes = [
 { path: '', redirectTo: 'allocations', pathMatch: 'full' },
 { path: 'allocations', component: AllocationComponent},
 { path: 'allocations/new', component: AddAllocationComponent},
 { path: 'allocations/edit/:id', component: EditAllocationComponent},
 { path: 'employees', component: EmployeesListComponent, },
 { path: 'employees/new', component: AddEmployeeComponent }, 
 { path: 'employees/edit/:id', component: EditEmployeeComponent },
]; 

// { path: '', redirectTo: '/allocation', pathMatch: 'full'},
// { path: 'employees', component: EmployeesListComponent, children:[
//   { path: 'new', component: AddEmployeeComponent},
//   { path: 'edit/:id', component: EditEmployeeComponent},
// ]},
// { path: 'allocation', component: AllocationComponent},
 
// ]; 
 
 
 
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }