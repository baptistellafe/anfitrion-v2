import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anf-made-w-love',
  templateUrl: './made-w-love.component.html',
  styleUrls: ['./made-w-love.component.scss'],
})
export class MadeWLoveComponent  implements OnInit {
  @Input() posicionamento: string;
  @Input() centralizarNoMobile: boolean;

  constructor() { }

  ngOnInit() {}

}
