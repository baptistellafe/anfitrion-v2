import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import { Title } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'anf-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {

  public tipoDeContato: 'comercial' | 'outros';

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState = AppStore.appInitialState;

  constructor(
    private store : Store,
    private title : Title,
    private alertCtrl : AlertController
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
    this.definirTipoDeContatoInicial('comercial');
  }

  ionViewDidEnter(): void {
    this.title.setTitle(`Fale comigo`)
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

  public definirTipoDeContatoInicial(tipo: 'comercial' | 'outros'): void {
    this.tipoDeContato = tipo;
  }

  public async mostrarAlerta(tipo: 'whatsapp' | 'email'): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      subHeader: `${tipo === 'whatsapp' ? 'WhatsApp' : 'E-mail'}`,
      message: `
        ${
          tipo === 'whatsapp' ?
          'Se você tiver o app do WhatsApp nós te direcionaremos para lá, tudo bem?' :
          'Nós abriremos o seu app padrão de e-mail, tudo bem?'
        }
      `,
      buttons: [
        {
          role: 'cancel',
          text: 'Cancelar'
        },
        {
          role: 'confirm',
          text: 'Tudo bem',
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

  public abrirWhatsApp(): void {
    window.open(`https://wa.me/${this.informacoes.anfitrion.whatsApp}`, '_blank');
  }

  public abrirAppDeEmail(): void {
    window.location.href = "mailto:anfitrionappoficial@gmail.com";
  }

}
