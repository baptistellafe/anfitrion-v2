import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'anf-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private title : Title
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.title.setTitle(`Início | anfitrion`);
  }

}
