import { Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Idioma } from 'src/app/interfaces/Idioma';
import { AppConfigService } from 'src/app/services/app-config.service';
import * as AppStore from './../../../app/store/app/app.state';
import { IDIOMA_KEY } from 'src/app/consts/keys';
import { StorageService } from 'src/app/services/storage.service';


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
    private appConfigService : AppConfigService,
    private store : Store,
    private storageService : StorageService
  ) { }

  ngOnInit() {
    this.obterIdiomas();
    this.definirIdioma(this.idiomas[0]);
  }

  public definirIdioma(lang: Idioma): void {
    this.idiomaSelecionado = lang;
    let props = { idioma: this.idiomaSelecionado}

    this.store.dispatch(AppStore.definirIdioma(props))
    this.storageService.armazenarChave(IDIOMA_KEY, this.idiomaSelecionado);
  }

  public obterIdiomas(): void {
    this.idiomas = this.appConfigService.obterIdiomas();
  }

}
