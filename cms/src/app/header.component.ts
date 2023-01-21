import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  collapsed = true;

  onSelected(selectedEvent: string){
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
