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
    "This is the Document description 1",
    "http://www.website.com",
    "Document children", 
    ),
    new Document(2, 
      "Document 2", 
      "This is the Document description 2",
      "http://www.website.com",
      "Document children", 
      ),
    new Document(3, 
      "Document 3", 
      "This is the Document description 3",
      "http://www.website.com",
      "Document children", 
      ),
    new Document(4, 
      "Document 4", 
      "This is the Document description 4",
      "http://www.website.com",
      "Document children", 
      )
  ]

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document)
  }
}

