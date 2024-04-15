import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IDIOMA_KEY } from '../consts/keys';
import { Store } from '@ngrx/store';
import * as AppStore from './../../app/store/app/app.state';
import { Idioma } from '../interfaces/Idioma';
import { AppConfigService } from './app-config.service';


@Injectable({
  providedIn: 'root'
})
export class TranslateAnfService {

  private idiomas: Idioma[];

  constructor(
    private translate : TranslateService,
    private storage : StorageService,
    private store : Store,
    private appCfg : AppConfigService
  ) {
    this.idiomas = this.appCfg.obterIdiomas();
  }

  public async definirIdiomaInicial() {

    let idiomaDaStorage: Idioma = await this.storage.obterChave(IDIOMA_KEY);

    let idiomaDoNavegador: string | undefined = this.translate.getBrowserLang();

    if (idiomaDaStorage) {
      this.definirIdioma(idiomaDaStorage.value);
    } else {
      switch (idiomaDoNavegador) {
        case 'pt':
        case 'en':
        case 'es':
        this.definirIdioma(idiomaDoNavegador);
          break;

        default:
          this.definirIdioma('en');
          break;
      }
    }

  }

  public definirIdioma(idiomaSelecionado: string): void {
     let idiomaQueSeraDefinido = this.idiomas.find((idioma: Idioma) => {
      return idioma.value === idiomaSelecionado;
    });

    if (idiomaQueSeraDefinido) {
      this.translate.setDefaultLang(idiomaQueSeraDefinido.value);
      this.translate.use(idiomaQueSeraDefinido.value)
      this.storage.armazenarChave(IDIOMA_KEY, idiomaQueSeraDefinido);
      let idiomaProps = { idioma: idiomaQueSeraDefinido }
      this.store.dispatch(AppStore.definirIdioma(idiomaProps))
    }
  }
}
