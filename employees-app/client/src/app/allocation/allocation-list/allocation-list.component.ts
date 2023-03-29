import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Allocation } from 'src/app/allocation';
import { AllocationService } from 'src/app/allocation.service';

@Component({
  selector: 'app-allocation-list',
  templateUrl: './allocation-list.component.html',
  styleUrls: ['./allocation-list.component.css'
  ]
})
export class AllocationListComponent {
  pipe = new DatePipe('en-UK');
  myFormattedDate: any;
  allocations$: Observable<Allocation[]> = new Observable();

  constructor(public datepipe: DatePipe, private allocationService: AllocationService, private router: Router, private route: ActivatedRoute){
    const now = Date.now();
    this.myFormattedDate = this.pipe.transform(now, 'fullDate');
  }
  
  ngOnInit(): void {
    this.fetchAllocations();
  }
  
  deleteAllocation(id: string): void {
    this.allocationService.deleteAllocation(id).subscribe({
      next: () => this.fetchAllocations()
    });
  }
  
  private fetchAllocations(): void {
    this.allocations$ = this.allocationService.getAllocations();
  }
 
  onAddAllocation(){
   this.router.navigate(['new'], {relativeTo: this.route})
  }
}
