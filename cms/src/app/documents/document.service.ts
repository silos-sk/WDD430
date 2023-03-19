import { Injectable, EventEmitter} from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  maxDocumentId: number;
  documentChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();

  documents: Document[];
  constructor( private http: HttpClient) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   
  }

  // 'https://angular-cms-9c0a8-default-rtdb.europe-west1.firebasedatabase.app/documents.json'
  sortAndSend(){
    this.documents.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.documentChangedEvent.next(this.documents.slice())
  }

  getDocuments() {
    return this.http
      .get<Document[]>(
        'http://localhost:3000/documents'
      ).subscribe((documents: Document[] ) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        documents.sort((current, next)=>{
          if (current < next){
            return -1;
          } else if (current > next){
            return 0;
          }
        });
        let documentsListClone = this.documents.slice()
        this.documentChangedEvent.next(documentsListClone);
      }, (error: any) => {
       console.log(error);
     } 
    )
  }

  storeDocuments() {
    this.http.put("https://angular-cms-9c0a8-default-rtdb.europe-west1.firebasedatabase.app/documents.json", JSON.stringify(this.documents)
    , { headers: new HttpHeaders({"Content-Type" : "application/json"})}).subscribe(()=>
      this.documentChangedEvent.next(this.documents.slice())
    )
   }

  // getDocuments(): Document[]{
  //   return this.documents.slice();
  // }

  getDoc(index: number){
    return this.documents[index];
}

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id == id) {
        return document;
      }
    } return null
  }

//   deleteDocument(document: Document) {
//     if (!document) {
//        return;
//     }
//     const pos = this.documents.indexOf(document);
//     if (pos < 0) {
//        return;
//     }
//     this.documents.splice(pos, 1);
//     this.documentChangedEvent.next(this.documents.slice());
//  }

 getMaxId(): number {
  let maxId = 0

  for (let document of this.documents){
    let currentId = parseInt(document.id);
    if (currentId > maxId){
      maxId = currentId
    }
  }
  return maxId;
}

// addDocument(newDocument: Document) {
//   if (!newDocument){
//     return;
//   }
//   this.maxDocumentId++;
//   newDocument.id = this.maxDocumentId.toString();
//   this.documents.push(newDocument);
//   let documentsListClone = this.documents.slice()
//   // this.documentChangedEvent.next(documentsListClone)
//   this.storeDocuments();
// }
addDocument(document: Document) {
  if (!document) {
    return;
  }

  // make sure id of the new Document is empty
  document.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      }
    );
}

// updateDocument(originalDocument: Document, newDocument: Document) {
//   if (!originalDocument || !newDocument) {
//       return
//   }
//   let pos = this.documents.indexOf(originalDocument);
//   console.log(`The index if pos is ${pos}`)
//   if (pos < 0) {
//       return;
//   }
//   newDocument.id = originalDocument.id;
//   this.documents[pos] = newDocument;
//   let documentsListClone = this.documents.slice();
//   // this.documentChangedEvent.next(documentsListClone);
//   this.storeDocuments();
// }

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
  newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      }
    );
}

// deleteDocument(document: Document) {
//   if (!document) {
//       return;
//   }
//   let pos = this.documents.indexOf(document);
//   if (pos < 0) {
//       return;
//   }
//   this.documents.splice(pos, 1);
//   let documentsListClone = this.documents.slice();
//   // this.documentChangedEvent.next(documentsListClone);
//   this.storeDocuments();
// }

deleteDocument(document: Document) {

  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      }
    );

    
}
  
}
