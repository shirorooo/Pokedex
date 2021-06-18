import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {
  @Input() subMenuToggle = false;
  @Output() subMenuIsHidden = new EventEmitter();

  public generations = [
    'Generation 1',
    'Generation 2',
    'Generation 3',
    'Generation 4',
    'Generation 5',
    'Generation 6',
    'Generation 7',
    'Generation 8',
  ];

  public items = [
    'Pokeballs',
    'Berries',
    'Potions',
    'Held Items'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  subMenuHidden(){
    this.subMenuToggle = false;
  }

}
