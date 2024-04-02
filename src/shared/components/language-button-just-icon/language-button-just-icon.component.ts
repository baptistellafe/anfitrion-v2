import { Component, Input, OnInit } from '@angular/core';
import { Idioma } from 'src/app/interfaces/Idioma';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'anf-language-button-just-icon',
  templateUrl: './language-button-just-icon.component.html',
  styleUrls: ['./language-button-just-icon.component.scss'],
})
export class LanguageButtonJustIconComponent  implements OnInit {

  @Input() darkMode: boolean;

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
