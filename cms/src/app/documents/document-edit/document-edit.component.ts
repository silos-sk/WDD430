import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-documents-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  // @ViewChild('f', { static: false }) docForm: NgForm;
  // subscription: Subscription;
  originalDocument: Document;
  document: Document;
  id: number;
  editMode: boolean = false;

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);

      if (!this.originalDocument) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    })
  }

  // ngOnInit(): void {
  //   this.route.params
  //   .subscribe(
  //     (params: Params) =>{
  //       this.id = +params['id'];
  //       this.editMode = params['id'] != null;
  //       console.log(this.editMode)
  //     }
  //   )
  // }

  onSubmit(form: NgForm) {
     let id = " ";
     let name = form.value.name;
     let url = form.value.url;
     let description = form.value.description;
     if (!form.value.description) {
       description = "Enter Course Description Here";
     }
   
     const newDocument = new Document(id,name,description, url, " ");
     if (this.editMode == true) {
       this.documentService.updateDocument(this.originalDocument, newDocument)
     }
     else {
       this.documentService.addDocument(newDocument);
     }
    this.router.navigate(['../'], {relativeTo: this.route})
 }

 onCancel() {
  this.router.navigate(['../'], {relativeTo: this.route});
}

}
