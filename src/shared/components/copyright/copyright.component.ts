import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'anf-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
})
export class CopyrightComponent  implements OnInit {

  @Input() darkMode: boolean = false;
  public anoAtual : number = moment().year();
  public anoDeCriacao = 2024;

  constructor() { }

  ngOnInit() {}

}
