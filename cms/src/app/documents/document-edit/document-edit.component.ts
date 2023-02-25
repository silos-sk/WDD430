import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'cms-documents-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  id: number;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode)
      }
    )
  }

  onSubmit(){
    console.log()
  }
}
