import { Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { Idioma } from 'src/app/interfaces/Idioma';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'anf-language-button',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss'],
})
export class LanguageButtonComponent  implements OnInit {

  @Input() darkMode: boolean = false;

  public idiomaSelecionado: Idioma;

  public idiomas: Idioma[];

  constructor(
    private appConfigService : AppConfigService
  ) { }

  ngOnInit() {
    this.obterIdiomas();
    this.definirIdioma(this.idiomas[0]);
  }

  public definirIdioma(lang: Idioma): void {
    this.idiomaSelecionado = lang;
  }

  public obterIdiomas(): void {
    this.idiomas = this.appConfigService.obterIdiomas();
  }

}
