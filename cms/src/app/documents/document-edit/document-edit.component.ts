import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-documents-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent {
  id: number;
  editMode = false;

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
}
