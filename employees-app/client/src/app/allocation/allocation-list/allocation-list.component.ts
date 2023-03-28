import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-allocation-list',
  templateUrl: './allocation-list.component.html',
  styleUrls: ['./allocation-list.component.css'
  ]
})
export class AllocationListComponent {
  pipe = new DatePipe('en-UK');
  myFormattedDate: any;

  constructor(public datepipe: DatePipe){
    const now = Date.now();
    this.myFormattedDate = this.pipe.transform(now, 'fullDate');
  }
}
