import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles:[`
  h3 {
    color: dodgerblue;
  }
  `]
})
export class AppComponent {
  allowUser = false;
  userName = '';

  constructor(){

  }
  ngOnInit() {
    
  }
  
  onUpdateUserName(event:any){
    this.userName = '';
}
}
