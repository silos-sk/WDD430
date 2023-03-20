import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit, OnDestroy{
 document: Document;
 documents: Document[];
 id: number;
 nativeWindow: any;
 subscription: Subscription;

 constructor(private documentService: DocumentService,
  private route: ActivatedRoute, private router: Router, private windRefService: WindRefService){}

ngOnInit(): void {
  this.nativeWindow = this.windRefService.getNativeWindow();
  this.subscription = this.route.params
  .subscribe(
    (params: Params) =>{
      this.id = params['id'];
      this.document = this.documentService.getDoc(this.id);

    }
  )
}

onEditDoc(){
  {this.router.navigate(['edit'], {relativeTo: this.route})}
  // // this.router.navigate['../', this.id, 'edit'], {relativeTo: this.route }
  // this.router.navigate(['documents', this.id, 'edit']), {relativeTo: this.route }
}

onView(){
  if(this.document.url){
    this.nativeWindow.open(this.document.url);
  }
}

onDelete(){
  this.documentService.deleteDocument(this.document);
  {this.router.navigateByUrl('documents')}
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

}
