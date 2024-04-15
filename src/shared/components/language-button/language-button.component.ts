import { IAppState } from 'src/app/store/app/app.state';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Idioma } from 'src/app/interfaces/Idioma';
import { AppConfigService } from 'src/app/services/app-config.service';
import * as AppStore from './../../../app/store/app/app.state';
import { TranslateAnfService } from 'src/app/services/translate-anf.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'anf-language-button',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss'],
})
export class LanguageButtonComponent  implements OnInit, OnDestroy {
  @Output() idiomaAlterado: EventEmitter<any> = new EventEmitter();

  @Input() darkMode: boolean = false;

  public inscricaoEmInformacoes: Subscription;
  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState = AppStore.appInitialState;

  public idiomaSelecionado: Idioma;

  public idiomas: Idioma[];

  constructor(
    private appConfigService : AppConfigService,
    private store : Store,
    private translateApp : TranslateAnfService
  ) { }

  ngOnInit() {
    this.obterIdiomas();
    this.obterTodasAsInformacoes();
  }

  ngOnDestroy(): void {
    this.desinscreverDeTodasAsInformacoes();
  }

  public definirIdioma(lang: Idioma): void {
    this.translateApp.definirIdioma(lang.value);
    this.emitirMudancaNoBotao(lang);
  }

  public obterIdiomas(): void {
    this.idiomas = this.appConfigService.obterIdiomas();
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.inscricaoEmInformacoes = this.informacoes$.subscribe((res: IAppState) => {
      this.informacoes = res;
      this.idiomaSelecionado = this.informacoes.idioma;
    })
  }

  public desinscreverDeTodasAsInformacoes(): void {
    this.inscricaoEmInformacoes.unsubscribe();
  }

  public emitirMudancaNoBotao(idioma: Idioma): void {
    this.idiomaAlterado.emit(idioma);
  }

}
