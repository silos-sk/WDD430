import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, 
    "First Message", 
    "Hi, how are you?",
    "Peter", 
    ),
    new Message(2, 
      "Second Message", 
      "Meeting tomorrow at 10AM. See you there!",
      "Alisa"
      ),
    new Message(3, 
      "Third Message", 
      "Just a quick hello",
      "Jericho"
      )
  ]

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
