import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  maxMessageId: number;
  messageChangedEvent = new EventEmitter<Message[]>();

  private messages: Message[];
  constructor(private http:HttpClient) { 
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
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

  getMessages() {
    return this.http
      .get<Message[]>(
        'https://angular-cms-9c0a8-default-rtdb.europe-west1.firebasedatabase.app/messages.json'
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

  addMessage(message: Message){
    this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }
}
