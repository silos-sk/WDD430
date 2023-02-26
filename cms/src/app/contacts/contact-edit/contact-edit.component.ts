import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  
  constructor(
       private contactService: ContactService,
       private router: Router,
       private route: ActivatedRoute) {
       }

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getCont(id);
        // console.log(`The original contact is`);
        // console.log(this.originalContact)
  
        if (!this.originalContact) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        
        // console.log('This contact is')
        // console.log(this.contact.group)
        // The only difference is that the algorithm must determine if the contact has a group (in other words, the group property has a value). If it does, create a cloned copy of the array of Contact objects assigned to the group property in the originalContact and assign the cloned array to the groupContacts property. Use the JSON parse() and stringify() methods to make a clone of the originalContact.

        // console.log('The parsed contact is')
        // console.log(this.contact)

        if (this.contact.group != null){
          this.groupContacts = this.contact.group.slice()
          
        }
      })
    }

    onSubmit(form: NgForm) {
   
      const value = form.value // get values from form’s fields
  
      const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group);
  
      if (this.editMode == true){
        this.contactService.updateContact(this.originalContact, newContact)

        // Add the added groupContacts array to newContact group
        newContact.group = this.groupContacts
        console.log(newContact);
      } else {
        this.contactService.addContact(newContact)
      }
      
      this.router.navigate(['../'], {relativeTo: this.route})
   }
  
   onCancel() {
    {this.router.navigateByUrl('contacts')}
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
       if (newContact.id === this.groupContacts[i].id) {
         return true;
      }
    }
    return false;
 }

 addToGroup($event: any) {
  const selectedContact: Contact = $event.dragData;
  const invalidGroupContact = this.isInvalidContact(selectedContact);
  if (invalidGroupContact){
     return;
  }
  this.groupContacts.push(selectedContact);
  this.contact.group = this.groupContacts;
  console.log('this is the contact with the added contact groups')
  console.log(this.contact)


}

onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
     return;
  }
  this.groupContacts.splice(index, 1);
}
  }