import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anf-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent  implements OnInit {

  @Input() especial: boolean;
  @Input() foiSelecionado: boolean;
  @Input() texto: any;
  @Input() icone: string;

  constructor() { }

  ngOnInit() {}

}
