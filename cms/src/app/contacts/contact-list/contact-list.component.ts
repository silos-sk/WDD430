import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
    contacts: Contact[];
    private subscription: Subscription;
    term: string;

    constructor(private contactService: ContactService, private router: Router, private route:ActivatedRoute){}

    ngOnInit(): void {
      this.contacts = this.contactService.getContacts()
      this.subscription = this.contactService.contactChangedEvent.subscribe((contact: Contact[])=>{
        this.contacts = contact;
    })
    }

    search(value: string){
      this.term = value;
    }

    onAddContact(){
      this.router.navigate(['new'], {relativeTo: this.route})
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
