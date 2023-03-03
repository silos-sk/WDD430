import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute){}

//   ngOnInit() {
//     // this.documents = this.documentService.getDocuments();
//     this.subscription = this.documentService.documentChangedEvent.subscribe((documents: Document[])=>{
//       this.documents = documents;
//   })
  
// }

ngOnInit() {
  this.subscription = this.documentService.documentChangedEvent
  .subscribe((documents: Document[]) => {
    this.documents = documents;
  })

  this.documentService.getDocuments();
}

  onAddDocument(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

