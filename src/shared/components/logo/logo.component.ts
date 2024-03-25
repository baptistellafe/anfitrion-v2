import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anf-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent  implements OnInit {

  @Input() brand: string;
  @Input() darkMode: boolean;
  @Input() type: string
  @Input() animated: boolean;

  constructor() { }

  ngOnInit() {}

}
