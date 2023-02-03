import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  currentSender: string = '2';
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;

  constructor(private messageService: MessageService){}

  ngOnInit():void {
    
  }

  onSendMessage(){
    const msgSubj = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const newMessage = new Message('2', msgSubj, msgText, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear(){
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
