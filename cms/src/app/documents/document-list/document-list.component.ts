import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, 
    "Document 1", 
    "Document description 1",
    "Document Url",
    "Document children", 
    ),
    new Document(2, 
      "Document 2", 
      "Document description 2",
      "Document Url",
      "Document children", 
      ),
    new Document(3, 
      "Document 3", 
      "Document description 3",
      "Document Url",
      "Document children", 
      ),
    new Document(4, 
      "Document 4", 
      "Document description 4",
      "Document Url",
      "Document children", 
      )
  ]

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document)
  }
}

