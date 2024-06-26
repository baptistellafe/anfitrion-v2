import { Component, ElementRef, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonInput, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { JA_ACESSOU_ANFITRION_KEY, PRIMEIRO_NOME_KEY } from 'src/app/consts/keys';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IAppState, definirPrimeiroAcesso, definirPrimeiroNome } from 'src/app/store/app/app.state';
import Swiper from 'swiper';
import * as AppStore from './../../store/app/app.state';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anf-primeiro-acesso',
  templateUrl: './primeiro-acesso.page.html',
  styleUrls: ['./primeiro-acesso.page.scss'],
})
export class PrimeiroAcessoPage implements OnInit, OnDestroy {

  @ViewChild('inputPrimeiroNome') inputPrimeiroNome: IonInput;
  public nomeDoVisitante: string = '';

  @ViewChild('primeiroAcessoSwiper') primeiroAcessoSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: number | undefined = 0;

  public informacoes: IAppState = AppStore.appInitialState;
  private informacoes$: Observable<IAppState>;
  private inscricaoInformacoes: Subscription;

  public traducaoDaTela: any;
  private traducaoDaTela$: Observable<any>;
  private inscricaoTraducaoDaTela: Subscription;

  constructor(
    private title : Title,
    private utilsService : UtilsService,
    private navCtrl : NavController,
    private store : Store,
    private storageService : StorageService,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
    this.obterTraducaoDaTela();
  }

  /**
    @description Avançar para o próximo slide.
  */
  public avancarSwiper(): void {
    this.utilsService.avancarSwiper(this.primeiroAcessoSwiper)
  }

  /**
    @description Obtém o index ativo do swiper.
  */
  public retornarSwiper(): void {
    this.utilsService.retornarSwiper(this.primeiroAcessoSwiper)
  }

  /**
    @description Disparado quando houver mudança no swiper.
  */
  public slideMudou(): void {
    this.obterIndexAtualDoSwiper();
  }

  /**
    @description Transforma a string, removendo espaços em branco, acentuação, números, etc...
  */
  public transformarNome(nome: string): void {
    this.nomeDoVisitante = this.utilsService.transformarNome(nome);
  }

  /**
    @description Foca em um IonInput (necessário o settimeout).
  */
  public focarNoInputPrimeiroNome(): void {
    setTimeout(() => {
      this.inputPrimeiroNome.setFocus()
    }, 500);
  }

  /**
    @description Obtém o index ativo do swiper.
  */
  public obterIndexAtualDoSwiper(): void {
    this.indexAtual = this.utilsService.obterIndexAtualDoSwiper(this.primeiroAcessoSwiper);
    this.definirComportamentoDeAcordoComSlide();
  }

  /**
    @description Define o comportamento da tela de acordo com o slide ativo.
    Hoje, no primeiro slide, nós focamos no input automaticamente ao entrar no slide.
  */
  public definirComportamentoDeAcordoComSlide(): void {
    switch (this.indexAtual) {
      case 1:
        if (this.nomeDoVisitante) return;
        this.focarNoInputPrimeiroNome();
        break;

      default:
        break;
    }
  }

  /**
    @description Ao ir para tela de boas vindas, guardamos alguns valores e
    informamos ao aplicativo o que foi definido: Primeiro acesso, nome...
  */
  public boasVindas(): void {

    let jaAcessouAnfitrion: boolean = true;
    this.storageService.armazenarChave(JA_ACESSOU_ANFITRION_KEY, jaAcessouAnfitrion);
    this.store.dispatch(definirPrimeiroAcesso({ jaAcessouAnfitrion }));

    let primeiroNome: string = this.nomeDoVisitante;
    this.storageService.armazenarChave(PRIMEIRO_NOME_KEY, primeiroNome);
    this.store.dispatch(definirPrimeiroNome({ primeiroNome }))

    this.navCtrl.navigateForward('/boas-vindas');
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
  public obterTraducaoDaTela(): void {
    this.traducaoDaTela$ = this.translate.get('TELA_PRIMEIRO_ACESSO');
    this.inscricaoTraducaoDaTela = this.traducaoDaTela$
    .subscribe((res: any) => {
      this.traducaoDaTela = res;
      this.title.setTitle(`${this.traducaoDaTela?.TITULO}`);
    })
  }

  /**
   * @description Dispara uma ação quando o idioma é alterado.
   * Capturamos o evento e neste caso re-traduzimos o TS.
   */
  public idiomaMudou(): void {
    this.obterTraducaoDaTela();
  }

  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
    this.inscricaoTraducaoDaTela.unsubscribe();
  }
}
