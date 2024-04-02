import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anf-sugest-card',
  templateUrl: './sugest-card.component.html',
  styleUrls: ['./sugest-card.component.scss'],
})
export class SugestCardComponent  implements OnInit {

  @Input() sugestao: any;

  constructor() { }

  ngOnInit() {}

}
