import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

 constructor(private documentService: DocumentService,
  private route: ActivatedRoute, private router: Router){}

ngOnInit(): void {
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

}
