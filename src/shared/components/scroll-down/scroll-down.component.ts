import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anf-scroll-down',
  templateUrl: './scroll-down.component.html',
  styleUrls: ['./scroll-down.component.scss'],
})
export class ScrollDownComponent  implements OnInit {

  @Input() color: string;

  constructor() { }

  ngOnInit() {}

}
