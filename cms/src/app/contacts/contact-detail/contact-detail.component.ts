import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: number;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.params
  .subscribe(
    (params: Params) =>{
      this.id = +params['id'];
      this.contact = this.contactService.getCont(this.id);
    }
  )
  }

  onEditContact(){
    // {this.router.navigate(['edit'], {relativeTo: this.route})}
    this.router.navigate(['contacts', this.id, 'edit']), {relativeTo: this.route }
  }
  
  onDelete(){
    this.contactService.deleteContact(this.contact);
    {this.router.navigateByUrl('contacts')}
  }
}
