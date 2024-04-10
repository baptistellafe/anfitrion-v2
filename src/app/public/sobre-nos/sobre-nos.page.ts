import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import Swiper from 'swiper';
import { UtilsService } from 'src/app/services/utils.service';
import { AlertController, IonContent } from '@ionic/angular';
@Component({
  selector: 'anf-sobre-nos',
  templateUrl: './sobre-nos.page.html',
  styleUrls: ['./sobre-nos.page.scss'],
})
export class SobreNosPage implements OnInit {
  @ViewChild('sobreNosConteudo') sobreNosConteudo: IonContent;

  @ViewChild('sobreNosSwiper') sobreNosSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: any = 0;

  public accordionAberto: 'sobre' | '' = 'sobre';
  public querendoIrParaInstagram: boolean = false;

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState = AppStore.appInitialState;

  constructor(
    private title : Title,
    private store : Store,
    private utilsService : UtilsService,
    private alertCtrl : AlertController
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
  }

  ionViewDidEnter(): void {
    this.title.setTitle(`Sobre o anfitrion`);
    this.scrollarConteudoParaTopo(this.sobreNosConteudo, 500);
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.informacoes$.subscribe((res: IAppState) => {
      this.informacoes = res;
    })
  }

  /**
  @description Obtém o index ativo do swiper.
  */
  public obterIndexAtualDoSwiper() {
    this.indexAtual = this.utilsService.obterIndexAtualDoSwiper(this.sobreNosSwiper);
    console.log(this.indexAtual);

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
      subHeader: `${this.informacoes.primeiroNome ? this.informacoes.primeiroNome : 'visitante'},`,
      message: 'Vou te direcionar para o nosso perfil do Instagram, tudo bem?',
      buttons: [
        {
          role: 'cancel',
          text: 'Cancelar',
          handler: () => {
            this.querendoIrParaInstagram = false;
          }
        },
        {
          text: 'Tudo bem',
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

}
