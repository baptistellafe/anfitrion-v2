import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonContent, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { IAppState } from 'src/app/store/app/app.state';
import Swiper from 'swiper';
import * as AppStore from './../../store/app/app.state';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Sugestao } from 'src/app/interfaces/Sugestao';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'anf-sugestoes',
  templateUrl: './sugestoes.page.html',
  styleUrls: ['./sugestoes.page.scss'],
})
export class SugestoesPage implements OnInit, OnDestroy {

  @ViewChild('conteudoSugestoes') conteudoSugestoes: IonContent;
  @ViewChild('sugestoesSwiper') sugestoesSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: any = 1;

  public sugestoes: Sugestao[];
  public totalDeSugestoes: number = 0;

  public heroEncolhido: boolean | undefined | void = false;

  public mostrarComponenteScrollDown: boolean = true;

  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  public traducaoDaTela: any;
  private traducaoDaTela$: Observable<any>;
  private inscricaoTraducaoDaTela: Subscription;

  constructor(
    private translate : TranslateService,
    private title : Title,
    private utilsService : UtilsService,
    private navCtrl : NavController,
    private store : Store,
    private appConfig : AppConfigService
  ) { }

  async ngOnInit() {
    this.obterTodasAsInformacoes();
    this.obterTraducaoDaTela();
    await this.toggleHero().then((res) => {
      this.heroEncolhido = res;
    })
  }

  public obterSugestoes(cidade: string): Sugestao[] {
    this.sugestoes = this.appConfig.obterSugestoes(cidade);
    this.definirLengthDeSugestoes();
    return this.sugestoes;
  }

  public async toggleHero(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  /**
    @description Define o total de sugestões para colocar no step.
  */
  public definirLengthDeSugestoes(): void {
    this.totalDeSugestoes = this.sugestoes.length;
  }

  /**
    @description Disparado quando houver mudança no swiper.
  */
  public slideMudou(): void {
    this.obterIndexAtualDoSwiper();
  }

  /**
    @description Obtém o index ativo do swiper.
  */
  public obterIndexAtualDoSwiper(): void {
    this.indexAtual = this.utilsService.obterIndexAtualDoSwiper(this.sugestoesSwiper);
    this.indexAtual = this.indexAtual + 1;
  }

  public trocarCidade(): void {
    this.navCtrl.navigateForward('/trocar-cidade');
  }

  /**
    @description Função responsável por esconder o componente de scroll quando começar a rolar a tela para baixo.
  */
  public esconderComponenteScroll(e: any): void {

    if (e.detail.scrollTop > 60) {
      this.mostrarComponenteScrollDown = false;
    } else {
      this.mostrarComponenteScrollDown = true;
    }
  }

  /**
    @description Ir para tela: Pontos turísticos BARRA cidade.
  */
  public irParaPontosTuristicos(): void {
    this.navCtrl.navigateForward(['pontos-turisticos', this.informacoes.cidadeEscolhida.value])
  }

  /**
    @description Responsável por levar o usuário ao topo da tela.
  */
  public irParaTopoDaTela(): void {
    this.conteudoSugestoes.scrollToTop(800);
    this.mostrarComponenteScrollDown = true;
  }

  /**
    @description Ir para tela: Sobre nós
  */
  public irParaSobreNos(): void {
    this.navCtrl.navigateForward(['sobre-nos'])
  }

  /**
    @description Direcionar usuário para tela de contato, onde irá sugerir conteúdo.
  */
    public sugerirConteudo(): void {
      this.navCtrl.navigateForward(['contato'])
    }

  /**
   * @description Obtém as informações guardadas no NGRX e já define as sugestões da cidade.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.inscricaoInformacoes = this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;
      this.obterSugestoes(this.informacoes.cidadeEscolhida.value);
    })
  }

  /**
   * @description Obtém a tradução da tela para ser usado no TS.
   */
  public obterTraducaoDaTela(): void {
    this.traducaoDaTela$ = this.translate.get('TELA_SUGESTOES');
    this.inscricaoTraducaoDaTela = this.traducaoDaTela$
    .subscribe((res: any) => {
      this.traducaoDaTela = res;
      this.title.setTitle(`${this.traducaoDaTela?.TITULO_TELA} ${this.informacoes.cidadeEscolhida.location[this.informacoes.idioma.value]}`);
    })
  }

  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
    this.inscricaoTraducaoDaTela.unsubscribe();
  }

}
