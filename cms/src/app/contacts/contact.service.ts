import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  maxContactId: number;
  contactChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();

  contacts: Contact[];
  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[]{
    return this.contacts.slice();
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
    this.contactChangedEvent.next(contactsListClone)
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
    this.contactChangedEvent.next(contactsListClone);
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
    this.contactChangedEvent.next(contactsListClone);
  }
}

