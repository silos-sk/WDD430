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

  // storeRecipes() {
  //   const recipes = this.recipeService.getRecipes();
  //   this.http
  //     .put(
  //       'https://ng-course-recipe-book-e517e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
  //       recipes
  //     )
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }
//   success(documents: Document[] ){
//     this.documents = documents;
//     this.maxDocumentId = this.getMaxId();
//     documents.sort((current, next)=>{
//       if (current < next){
//         return -1;
//       } else if (current > next){
//         return 0;
//       }
//     });
//     let documentsListClone = this.documents.slice()
//     this.documentChangedEvent.next(documentsListClone);
//   }

//   error(error: any) {
//    console.log(error);
//  } 


  getDocuments() {
    return this.http
      .get<Document[]>(
        'https://angular-cms-9c0a8-default-rtdb.europe-west1.firebasedatabase.app/documents.json'
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

addDocument(newDocument: Document) {
  if (!newDocument){
    return;
  }
  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);
  let documentsListClone = this.documents.slice()
  this.documentChangedEvent.next(documentsListClone)
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
      return
  }
  let pos = this.documents.indexOf(originalDocument);
  console.log(`The index if pos is ${pos}`)
  if (pos < 0) {
      return;
  }
  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  let documentsListClone = this.documents.slice();
  this.documentChangedEvent.next(documentsListClone);
}

deleteDocument(document: Document) {
  if (!document) {
      return;
  }
  let pos = this.documents.indexOf(document);
  if (pos < 0) {
      return;
  }
  this.documents.splice(pos, 1);
  let documentsListClone = this.documents.slice();
  this.documentChangedEvent.next(documentsListClone);
}
  
}
