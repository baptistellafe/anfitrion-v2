import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import { Router } from '@angular/router';
import { AlertController, IonInput, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { StorageService } from 'src/app/services/storage.service';
import { PRIMEIRO_NOME_KEY } from 'src/app/consts/keys';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anf-editar-dados',
  templateUrl: './editar-dados.page.html',
  styleUrls: ['./editar-dados.page.scss'],
})
export class EditarDadosPage implements OnInit, OnDestroy {
  @ViewChild('inputEditarPrimeiroNome') inputEditarPrimeiroNome: IonInput;

  public informacoesForm: FormGroup;
  public editandoNome: boolean = false;

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState = AppStore.appInitialState;
  public inscricaoInformacoes: Subscription;

  public traducaoDaTela: any;
  private traducaoDaTela$: Observable<any>;
  private inscricaoTraducaoDaTela: Subscription;

  constructor(
    private title : Title,
    private store : Store,
    private router : Router,
    public navCtrl : NavController,
    private formBuilder : FormBuilder,
    private utilsService : UtilsService,
    private storageService : StorageService,
    private toastCtrl : ToastController,
    private alertCtrl : AlertController,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.inicializarFormInformacoes();
    this.obterTodasAsInformacoes();
    this.obterTraducaoDaTela();
  }

  ionViewDidEnter(): void {
    this.mostrarInformativoDosDados();
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.inscricaoInformacoes = this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;
      this.preencherPrimeiroNome(this.informacoes.primeiroNome);
    })
  }

  public retornarPara(): void {
    if (this.informacoes.rotaAnterior) {
      this.navCtrl.navigateBack(this.informacoes.rotaAnterior);
    } else {
      this.navCtrl.navigateRoot(['qual-a-boa']);
    }
  }

  public inicializarFormInformacoes(): void {
    this.informacoesForm = this.formBuilder.group({
      primeiroNome: [ null, [ Validators.required, Validators.minLength(3) ]]
    })
  }

   /**
    @description Transforma a string, removendo espaços em branco, acentuação, números, etc...
  */
  public transformarNome(): void {
    let primeiroNome = this.informacoesForm.get('primeiroNome')?.value;

    if (primeiroNome) {
      primeiroNome = this.utilsService.transformarNome(primeiroNome);
      this.informacoesForm.patchValue({ 'primeiroNome' : primeiroNome });
    }
  }

  public preencherPrimeiroNome(primeiroNome: string): void {
    this.informacoesForm.patchValue({ 'primeiroNome' : primeiroNome });
  }

  public editarNome(): void {
    this.informacoesForm.reset();
    this.editandoNome = true;
    this.focarNoInputEditarPrimeiroNome();
  }

  public definirNomeDefinitivo(): void {
    let primeiroNome = this.informacoesForm.get('primeiroNome')?.value;
    let props = { primeiroNome: primeiroNome };
    this.store.dispatch(AppStore.definirPrimeiroNome(props));
    this.storageService.armazenarChave(PRIMEIRO_NOME_KEY, primeiroNome);
    this.editandoNome = false;
    this.mostrarNotificacao();
  }

  public cancelarEdicao(): void {
    this.editandoNome = false;
    this.informacoesForm.patchValue({ primeiroNome: this.informacoes.primeiroNome })
  }

  public async mostrarNotificacao(): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      icon: 'finger-print',
      mode: 'ios',
      translucent: false,
      position: 'top',
      cssClass: 'default',
      header: `${this.translate.instant('COMPONENTS.TOAST_INFORMACOES_ALTERADAS.HEADER')}`,
      message: `${this.translate.instant('COMPONENTS.TOAST_INFORMACOES_ALTERADAS.MENSAGEM')}`,
      duration: 3000
    })

    await toast.present();

    return toast;
  }

  public async mostrarInformativoDosDados(): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      subHeader: `${this.translate.instant('COMPONENTS.ALERTA_O_QUE_FAZEMOS_COM_INFORMACOES.SUBHEADER')}`,
      message: `${this.translate.instant('COMPONENTS.ALERTA_O_QUE_FAZEMOS_COM_INFORMACOES.MENSAGEM')}`,
      buttons: [`${this.translate.instant('COMPONENTS.ALERTA_O_QUE_FAZEMOS_COM_INFORMACOES.BOTAO_ENTENDI')}`]
    })

    await alert.present();

    return alert;
  }

  /**
    @description Foca em um IonInput (necessário o settimeout).
  */
  public focarNoInputEditarPrimeiroNome(): void {
    setTimeout(() => {
      this.inputEditarPrimeiroNome.setFocus()
    }, 500);
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
    });
  }

  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
    this.inscricaoTraducaoDaTela.unsubscribe();
  }
}
