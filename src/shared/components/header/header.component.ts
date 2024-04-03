import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() origem: string;
  @Input() darkMode: boolean;
  @Input() mostrarLogo: boolean = true;

  constructor() { }

  ngOnInit() {}

}
