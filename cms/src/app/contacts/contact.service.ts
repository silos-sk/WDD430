import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  maxContactId: number;
  contactChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();

  contacts: Contact[];
  constructor(private http:HttpClient) { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  sortAndSend(){
    this.contacts.sort((a,b)=>{
      if (a.name< b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactChangedEvent.next(this.contacts.slice())
  }


  // getContacts(): Contact[]{
  //   return this.contacts.slice();
  // }

  // https://angular-cms-9c0a8-default-rtdb.europe-west1.firebasedatabase.app/contacts.json

  getContacts() {
    return this.http
      .get<Contact[]>(
        'http://localhost:3000/contacts'
      ).subscribe((contacts: Contact[] ) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        contacts.sort((current, next)=>{
          if (current < next){
            return -1;
          } else if (current > next){
            return 0;
          }
        });
        let contactsListClone = this.contacts.slice()
        this.contactChangedEvent.next(contactsListClone);
      }, (error: any) => {
       console.log(error);
     } 
    )
  }

  storeContacts() {
    this.http.put("https://angular-cms-9c0a8-default-rtdb.europe-west1.firebasedatabase.app/contacts.json", JSON.stringify(this.contacts)
    , { headers: new HttpHeaders({"Content-Type" : "application/json"})}).subscribe(()=>
      this.contactChangedEvent.next(this.contacts.slice())
    )
   }

  getCont(index: number){
    return this.contacts[index];
}

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    } return null
  }

//   deleteContact(contact: Contact) {
//     if (!contact) {
//        return;
//     }
//     const pos = this.contacts.indexOf(contact);
//     if (pos < 0) {
//        return;
//     }
//     this.contacts.splice(pos, 1);
//     this.contactChangedEvent.next(this.contacts.slice());
//  }

  getMaxId(): number {
    let maxId = 0

    for (let contact of this.contacts){
      let currentId = parseInt(contact.id);
      if (currentId > maxId){
        maxId = currentId
      }
    }
    return maxId;
  }

  // addContact(newContact: Contact) {
  //   if (!newContact){
  //     return;
  //   }
  //   this.maxContactId++;
  //   newContact.id = this.maxContactId.toString();
  //   this.contacts.push(newContact);
  //   let contactsListClone = this.contacts.slice()
  //   // this.contactChangedEvent.next(contactsListClone)
  //   this.storeContacts();
  // }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
  
    // make sure id of the new Contacts is empty
    contact.id = '';
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }

  // updateContact(originalContact: Contact, newContact: Contact) {
  //   if (!originalContact || !newContact) {
  //       return
  //   }
  //   let pos = this.contacts.indexOf(originalContact);
  //   if (pos < 0) {
  //       return;
  //   }
  //   newContact.id = originalContact.id;
  //   this.contacts[pos] = newContact;
  //   let contactsListClone = this.contacts.slice();
  //   // this.contactChangedEvent.next(contactsListClone);
  //   this.storeContacts();
  // }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
  
    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
  
    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
  newContact.id = originalContact.id;
  // newContact._id = originalContact._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

// update database
this.http.put('http://localhost:3000/contacts/' + originalContact.id,
newContact, { headers: headers })
.subscribe(
  (response: Response) => {
    this.contacts[pos] = newContact;
    this.sortAndSend();
  }
);
  }
  deleteContact(contact: Contact) {
    if (!contact) {
        return;
    }
    let pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
        return;
    }
    // delete from database
  this.http.delete('http://localhost:3000/contacts/' + contact.id)
  .subscribe(
    (response: Response) => {
      this.contacts.splice(pos, 1);
      this.sortAndSend();
    }
  );

    // this.contacts.splice(pos, 1);
    // let contactsListClone = this.contacts.slice();
    // // this.contactChangedEvent.next(contactsListClone);
    // this.storeContacts();
  }
}

