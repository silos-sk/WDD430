import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent {
 document: Document;
 id: number;
 nativeWindow: any;

 constructor(private documentService: DocumentService,
  private route: ActivatedRoute, private router: Router, private windRefService: WindRefService){}

ngOnInit(): void {
  this.nativeWindow = this.windRefService.getNativeWindow();
  this.route.params
  .subscribe(
    (params: Params) =>{
      this.id = +params['id'];
      this.document = this.documentService.getDoc(this.id);
    }
  )
}

onEditDoc(){
  {this.router.navigate(['edit'], {relativeTo: this.route})}
  // this.router.navigate['../', this.id, 'edit'], {relativeTo: this.route }
}

onView(){
  if(this.document.url){
    this.nativeWindow.open(this.document.url);
  }
}

onDelete(){
  this.documentService.deleteDocument(this.document);
  {this.router.navigate(['documents'], {relativeTo: this.route})}
}

}
