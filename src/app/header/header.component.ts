import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // ANIMATION FOR SUBHEADER. ILIPAT SA SEPARATE NA FILE FOR REUSABILITY
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('600ms ease-out')),
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public subMenuClicked = false;

  constructor() { }

  ngOnInit(): void {
  }

  public get stateName(){
    return this.subMenuClicked ? 'show' : 'hide'
  }

  subMenuToggle(){
    this.subMenuClicked = !this.subMenuClicked;
  }

 
}
