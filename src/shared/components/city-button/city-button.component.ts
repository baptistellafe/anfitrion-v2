import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertOptions } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { CIDADE_ESCOLHIDA_KEY, IDIOMA_KEY } from 'src/app/consts/keys';
import { Cidade } from 'src/app/interfaces/Cidade';
import { AppConfigService } from 'src/app/services/app-config.service';
import { StorageService } from 'src/app/services/storage.service';
import { IAppState, definirCidade } from 'src/app/store/app/app.state';
import * as AppStore from './../../../app/store/app/app.state';
import {  LangChangeEvent, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'anf-city-button',
  templateUrl: './city-button.component.html',
  styleUrls: ['./city-button.component.scss'],
})
export class CityButtonComponent  implements OnInit, OnDestroy {

  public cities: Cidade[];
  public cidadeEscolhida: Cidade;
  public selectedCityValue: string;

  public configuracaoDoAlertaDeCidade: AlertOptions = {
    backdropDismiss: false
  }

  public informacoes: IAppState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  public traducaoDoComponent: any;
  public traducaoDoComponent$: Observable<any>;
  public inscricaoTraducaoDoComponente: Subscription;

  public mudancasNoIdioma$: Observable<any>;
  public inscricaoMudancaNoIdioma: Subscription;

  constructor(
    private appConfig : AppConfigService,
    private store : Store,
    private storageService : StorageService,
    private translate : TranslateService
  ) { }

  async ngOnInit() {
    this.identificarMudancaNoIdioma();
    this.cities = this.appConfig.obterCidades();
    this.obterTodasAsInformacoes();
    this.obterTraducaoDoComponente();
    this.definirCidadeInicial();
  }

  /**
   * @description Define a cidade inicial.
   */
  public definirCidadeInicial(): void {

    if (this.informacoes.cidadeEscolhida.value) {
      this.cidadeEscolhida = this.informacoes.cidadeEscolhida;
    } else {
      this.cidadeEscolhida = this.cities[0];
    }

    let cidadeEscolhida = this.cidadeEscolhida;
    this.storageService.armazenarChave(CIDADE_ESCOLHIDA_KEY, this.cidadeEscolhida);
    this.store.dispatch(definirCidade({ cidadeEscolhida }));
  }

  /**
   * @description Define a cidade escolhida.
   */
  public definirCidade(e?: any): void {
    let cidadeEscolhida: Cidade;
    cidadeEscolhida = this.cidadeEscolhida;

    this.storageService.armazenarChave(CIDADE_ESCOLHIDA_KEY, cidadeEscolhida);
    this.store.dispatch(definirCidade({ cidadeEscolhida }));
  }

  /**
   * @description Compara se a cidade selecionada é igual a da opção e checa.
   * Disponível no próprio exemplo do Ionic.
   */
  public compararCidades(city1: Cidade, city2: Cidade): boolean {
    return city1 && city2 ? city1.value === city2.value : city1 === city2;
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.inscricaoInformacoes = this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;
    })
  }

  /**
   * @description Obtém a tradução da tela para ser usado no TS.
   * Neste caso não precisa se desinscrever por causa do Take(1).
   */
  public obterTraducaoDoComponente(): void {
    this.traducaoDoComponent$ = this.translate.get('COMPONENTS.SELETOR_DE_CIDADES');
    this.inscricaoTraducaoDoComponente = this.traducaoDoComponent$
    .subscribe((res: any) => {
      this.traducaoDoComponent = res;
      this.definirConfiguracaoDoAlertaDeCidade();
    })
  }

  /**
   * @description Função responsável por identificar mudança no idioma.
   * Ele identifica mudanças, re-traduz a tela e re-define o que tiver que redefinir.
   */
  public identificarMudancaNoIdioma(): void {
    this.mudancasNoIdioma$ = this.translate.onLangChange;
    this.inscricaoMudancaNoIdioma = this.mudancasNoIdioma$
    .subscribe((event: LangChangeEvent) => {
      this.obterTraducaoDoComponente();
    });
  }

  /**
   * @description Define a configuração de algumas informações do Alert.
   */
  public definirConfiguracaoDoAlertaDeCidade(): void {
    this.configuracaoDoAlertaDeCidade = {
      ...this.configuracaoDoAlertaDeCidade,
      subHeader: this.traducaoDoComponent?.TITULO,
      message: this.traducaoDoComponent?.DESCRICAO
    }
  }

  /**
   * @description Responsável por desinscrever-se de observables inicializados na tela.
   */
  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
    this.inscricaoTraducaoDoComponente.unsubscribe();
    this.inscricaoMudancaNoIdioma.unsubscribe();
  }

}
