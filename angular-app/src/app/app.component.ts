import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles:[`
  h3 {
    color: dodgerblue;
  }
  .white{
    color: white;
  }
  `]
})
export class AppComponent {
  userName = '';
  content = 'Secret Password';
  displayStatus = false; 
  count = 0
  countArr: number[] = [];
  aboveFive = false;

  constructor(){

  }
  ngOnInit() {
    
  }
  toggleContent(){
   this.count += 1;
   this.countArr.push(this.count);
   return this.count % 2 === 0 ? this.displayStatus = true : this.displayStatus = false;
   
  }

  getColor(){
    // return this.count >= 5 ? this.aboveFive = true : this.aboveFive = false
    return this.count >= 5 ? 'blue' : 'white'
  }
}
