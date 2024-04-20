import { Component, ElementRef, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import Swiper from 'swiper';
import { UtilsService } from 'src/app/services/utils.service';
import { AlertController, IonContent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'anf-sobre-nos',
  templateUrl: './sobre-nos.page.html',
  styleUrls: ['./sobre-nos.page.scss'],
})
export class SobreNosPage implements OnInit, OnDestroy {
  @ViewChild('sobreNosConteudo') sobreNosConteudo: IonContent;

  @ViewChild('sobreNosSwiper') sobreNosSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: any = 0;

  public accordionAberto: 'sobre' | '' = 'sobre';
  public querendoIrParaInstagram: boolean = false;

  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  public traducaoDaTela: any;
  private traducaoDaTela$: Observable<any>;
  private inscricaoTraducaoDaTela: Subscription;

  constructor(
    private title : Title,
    private store : Store,
    private utilsService : UtilsService,
    private alertCtrl : AlertController,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
  }

  ionViewDidEnter(): void {
    this.scrollarConteudoParaTopo(this.sobreNosConteudo, 500);
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.inscricaoInformacoes = this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;

      this.obterTraducaoDaTela();
    })
  }

  /**
  @description Obtém o index ativo do swiper.
  */
  public obterIndexAtualDoSwiper() {
    this.indexAtual = this.utilsService.obterIndexAtualDoSwiper(this.sobreNosSwiper);
  }

  public slideSobreNosMudou(): void {
    this.obterIndexAtualDoSwiper();
  }

  /**
   * @description Abre o alerta de Instagram para poder mover o usuário para a conta oficial do anfitrion.
   * @param e opcional do tipo event, pois o clique pode ser disparado de um link.
   */
  public async irParaInstagram(e?: any): Promise<HTMLIonAlertElement> {
    this.querendoIrParaInstagram = true;

    const alert = await this.alertCtrl.create({
      mode: 'ios',
      subHeader: `${this.informacoes.primeiroNome ? this.informacoes.primeiroNome : this.translate.instant('GERAL.VISITANTE')},`,
      message: `${this.translate.instant('GERAL.DIRECIONAR_INSTAGRAM')}`,
      buttons: [
        {
          role: 'cancel',
          text: this.translate.instant('GERAL.CANCELAR'),
          handler: () => {
            this.querendoIrParaInstagram = false;
          }
        },
        {
          text: this.translate.instant('GERAL.TUDO_BEM'),
          handler: () => {
            alert.onDidDismiss().then(() => {
              this.querendoIrParaInstagram = false;
              window.open(`https://www.instagram.com/${this.informacoes.anfitrion.instagram}/`, '_blank');
            })
          }
        }
      ]
    })
    await alert.present();
    return alert;
  }

  public toggleInstagram(): void {
    this.accordionAberto ? '' : 'sobre';
  }

  /**
    @description Responsável por levar o usuário ao topo da tela.
  */
  public scrollarConteudoParaTopo(conteudo: IonContent, velocidade: number): void {
    this.utilsService.scrollarConteudoParaTopo(conteudo, velocidade);
  }

  /**
   * @description Obtém a tradução da tela para ser usado no TS.
   */
  public obterTraducaoDaTela(): void {
    this.traducaoDaTela$ = this.translate.get('TELA_SOBRE');
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
