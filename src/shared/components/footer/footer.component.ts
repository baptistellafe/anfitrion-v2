import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anf-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  @Input() darkMode: boolean = false;

  constructor() { }

  ngOnInit() {}

}
