import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]',
  // selector: '.app-servers',
  selector: 'app-servers',
  // template: '<app-server></app-server><app-server></app-server>',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit{
  allowNewServer = false;
  allowUser = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Testserver';
  serverCreated = false;
  userName = '';
  servers = ['Testserver', 'Testserver 2']

  constructor(){
    setTimeout(()=>{this.allowNewServer = true;}, 2000)
    this.onCreateUserName(this.userName)
  }
  ngOnInit() {
    
  }

  onCreateServer(){
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created ' + this.serverName;
  }

  onUpdateServerName(event:any){
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  onCreateUserName(name: any){
    name = this.userName
    if(this.userName){
      this.allowUser = true;
    }
  }
  
  onUpdateUserName(event:any){
    this.userName = '';
}
}
