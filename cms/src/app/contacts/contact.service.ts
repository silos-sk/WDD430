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

  // getContacts(): Contact[]{
  //   return this.contacts.slice();
  // }

  getContacts() {
    return this.http
      .get<Contact[]>(
        'https://angular-cms-9c0a8-default-rtdb.europe-west1.firebasedatabase.app/contacts.json'
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

  addContact(newContact: Contact) {
    if (!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice()
    // this.contactChangedEvent.next(contactsListClone)
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
        return
    }
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
        return;
    }
    let pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactsListClone);
    this.storeContacts();
  }
}

