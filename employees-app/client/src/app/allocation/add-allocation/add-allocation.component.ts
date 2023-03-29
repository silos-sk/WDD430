import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Allocation } from 'src/app/allocation';
import { AllocationService } from 'src/app/allocation.service';

@Component({
  selector: 'app-add-allocation',
  templateUrl: './add-allocation.component.html',
  styles: [
  ]
})
export class AddAllocationComponent {
  constructor(
    private router: Router,
    private allocationService: AllocationService
  ) { }
  
  addAllocation(allocation: Allocation) {
    this.allocationService.createAllocation(allocation)
      .subscribe({
        next: () => {
          this.router.navigate(['/allocations']);
        },
        error: (error) => {
          alert("Failed to create allocation");
          console.error(error);
        }
      });
  }
}
