import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Allocation } from 'src/app/allocation';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
 
@Component({
 selector: 'app-allocation-form',
 templateUrl: './allocation-form.component.html',
 styleUrls: ['./allocation-form.component.css'
 ]
})
export class AllocationFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<Allocation> = new BehaviorSubject({});

 @Output()
 formValuesChanged = new EventEmitter<Allocation>();
 
 @Output()
 formSubmitted = new EventEmitter<Allocation>();
 
 allocationForm: FormGroup = new FormGroup({});

 employees$: Observable<Employee[]> = new Observable();


 
 constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

//  constructor(private fb: FormBuilder) { }
 
 get theatreNum() { return this.allocationForm.get('theatreNum')!; }
 get list() { return this.allocationForm.get('list')!; }
 get type() { return this.allocationForm.get('type')!; }
 get doctor() { return this.allocationForm.get('doctor')!; }
 get staff1() { return this.allocationForm.get('staff1')!; }
 get staff2() { return this.allocationForm.get('staff2')!; }
 get name1() { return this.allocationForm.get('name1')!; }
 get name2() { return this.allocationForm.get('name2')!; }
//  get comments() { return this.allocationForm.get('comments')!; }
 
 ngOnInit() {
   this.initialState.subscribe(allocation => {
     this.allocationForm = this.fb.group({
      theatreNum: [ allocation.theatreNum, [Validators.required]],
       list: [ allocation.list, [Validators.required] ],
       type: [ allocation.type, [Validators.required] ],
       doctor: [ allocation.doctor, [Validators.required] ],
       staff1: [ allocation.staff1, [Validators.required] ],
       name1: [ allocation.name1, [Validators.required] ],
       staff2: [ allocation.staff2, [Validators.required] ],
       name2: [ allocation.name2, [Validators.required] ]
      //  comments: [ allocation.comments, [Validators.required] ]
     });
   });

   this.employees$ = this.employeeService.getEmployees();
   
   this.allocationForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.allocationForm.value);
 }

}