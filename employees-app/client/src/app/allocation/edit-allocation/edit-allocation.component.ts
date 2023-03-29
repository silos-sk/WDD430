import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Allocation } from 'src/app/allocation';
import { AllocationService } from 'src/app/allocation.service';
 
@Component({
 selector: 'app-edit-allocation.component.ts',
 templateUrl: './edit-allocation.component.html'
})
export class EditAllocationComponent implements OnInit {
 allocation: BehaviorSubject<Allocation> = new BehaviorSubject({});
 
 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private allocationService: AllocationService,
 ) { }
 
 ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
   if (!id) {
     alert('No id provided');
   }
 
   this.allocationService.getAllocation(id !).subscribe((allocation) => {
     this.allocation.next(allocation);
   });
 }
 
 editAllocation(allocation: Allocation) {
   this.allocationService.updateAllocation(this.allocation.value._id || '', allocation)
     .subscribe({
       next: () => {
         this.router.navigate(['/allocations']);
       },
       error: (error) => {
         alert('Failed to update allocation');
         console.error(error);
       }
     })
 }
}