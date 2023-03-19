import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  maxMessageId: number;
  messageChangedEvent = new Subject<Message[]>();

  messages: Message[];
  constructor(private http:HttpClient) { 
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  sortAndSend(){
    this.messages.sort((a,b)=>{
      if (a.sender < b.sender) {
        return -1;
      }
      if (a.sender > b.sender) {
        return 1;
      }
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice())
  }

  getMaxId(): number {
    let maxId = 0
  
    for (let message of this.messages){
      let currentId = parseInt(message.id);
      if (currentId > maxId){
        maxId = currentId
      }
    }
    return maxId;
  }

  // 'https://angular-cms-9c0a8-default-rtdb.europe-west1.firebasedatabase.app/messages.json'

  getMessages() {
    return this.http
      .get<Message[]>(
        'http://localhost:3000/messages'
      ).subscribe((messages: Message[] ) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        messages.sort((current, next)=>{
          if (current < next){
            return -1;
          } else if (current > next){
            return 0;
          }
        });
        let messagesListClone = this.messages.slice()
        this.messageChangedEvent.next(messagesListClone);
      }, (error: any) => {
       console.log(error);
     } 
    )
  }

  storeMessages() {
    this.http.put("https://angular-cms-9c0a8-default-rtdb.europe-west1.firebasedatabase.app/messages.json", JSON.stringify(this.messages)
    , { headers: new HttpHeaders({"Content-Type" : "application/json"})}).subscribe(()=>
      this.messageChangedEvent.next(this.messages.slice())
    )
   }

  // getMessages(): Message[]{
  //   return this.messages.slice();
  // }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id == id) {
        return message;
      }
    } return null
  }

  // addMessage(message: Message){
  //   this.messages.push(message);
  //   // this.messageChangedEvent.emit(this.messages.slice());
  //   this.storeMessages();
  // }

  addMessage(message: Message) {
    if (!message) {
      return;
    }
  
    // make sure id of the new Message is empty
    message.id = '';
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // add to database
    this.http.post<{ message: String,messageText: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          console.log(responseData)
          this.messages.push(responseData.messageText);
          this.sortAndSend();
        }
      );
  }
}
