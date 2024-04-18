import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import { Title } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anf-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit, OnDestroy {

  public tipoDeContato: 'comercial' | 'outros';

  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  public traducaoDaTela: any;
  private traducaoDaTela$: Observable<any>;
  private inscricaoTraducaoDaTela: Subscription;

  constructor(
    private store : Store,
    private title : Title,
    private alertCtrl : AlertController,
    private translate : TranslateService
  ) { }

  ngOnInit(): void {
    this.obterTodasAsInformacoes();
    this.definirTipoDeContatoInicial('comercial');
  }

  ionViewWillEnter(): void {
    this.obterTraducaoDaTela();
    this.title.setTitle(`${this.traducaoDaTela?.TITULO_TELA}`);
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
    this.traducaoDaTela$ = this.translate.get('TELA_CONTATO');
    this.inscricaoTraducaoDaTela = this.traducaoDaTela$
    .subscribe((res: any) => {
      this.traducaoDaTela = res;
    })
  }

  /**
   * @description Definir tipo de contato.
   */
  public definirTipoDeContatoInicial(tipo: 'comercial' | 'outros'): void {
    this.tipoDeContato = tipo;
  }

  /**
   * @description Mostrar alerta ao clicar no botão de WhatsApp ou e-mail.
   */
  public async mostrarAlerta(tipo: 'whatsapp' | 'email'): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      subHeader: `${tipo === 'whatsapp' ? 'WhatsApp' : 'E-mail'}`,
      message: `
        ${
          tipo === 'whatsapp' ?
          this.translate.instant('TELA_CONTATO.ALERTA_WHATSAPP') :
          this.translate.instant('TELA_CONTATO.ALERTA_EMAIL')
        }
      `,
      buttons: [
        {
          role: 'cancel',
          text: this.translate.instant('GERAL.CANCELAR')
        },
        {
          role: 'confirm',
          text:  this.translate.instant('GERAL.TUDO_BEM'),
          handler: () => {
            if (tipo === 'whatsapp') {
              this.abrirWhatsApp();
            } else {
              this.abrirAppDeEmail();
            }
          }
        }
      ]
    })

    await alert.present()
    return alert
  }

  /**
   * @description Abrir WhatsApp com mensagem.
   */
  public abrirWhatsApp(): void {
    let mensagemCodificada = encodeURIComponent(this.translate.instant('GERAL.EU_VIM_NO_ANFITRION'));
    window.open(`https://wa.me/${this.informacoes.anfitrion.whatsApp}?text=${mensagemCodificada}`, '_blank');
  }

  /**
   * @description Abrir o app padrão de e-mail do usuário.
   */
  public abrirAppDeEmail(): void {
    window.location.href = "mailto:anfitrionappoficial@gmail.com";
  }

  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
    this.inscricaoTraducaoDaTela.unsubscribe();
  }
}
