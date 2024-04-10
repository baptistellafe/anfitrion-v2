import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import { Router } from '@angular/router';
import { AlertController, IonInput, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { StorageService } from 'src/app/services/storage.service';
import { PRIMEIRO_NOME_KEY } from 'src/app/consts/keys';

@Component({
  selector: 'anf-editar-dados',
  templateUrl: './editar-dados.page.html',
  styleUrls: ['./editar-dados.page.scss'],
})
export class EditarDadosPage implements OnInit {
  @ViewChild('inputEditarPrimeiroNome') inputEditarPrimeiroNome: IonInput;

  public informacoesForm: FormGroup;
  public editandoNome: boolean = false;

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState = AppStore.appInitialState;

  public veioDeUmaRotaAnterior: boolean;

  constructor(
    private title : Title,
    private store : Store,
    private router : Router,
    public navCtrl : NavController,
    private formBuilder : FormBuilder,
    private utilsService : UtilsService,
    private storageService : StorageService,
    private toastCtrl : ToastController,
    private alertCtrl : AlertController
  ) { }

  ngOnInit() {
    this.inicializarFormInformacoes();
    this.obterTodasAsInformacoes();
  }

  ionViewWillEnter(): void {

  }

  ionViewDidEnter(): void {
    this.title.setTitle(`Altere suas informações`);
    this.mostrarInformativoDosDados();
    this.definirSeVeioDeUmaRotaAnterior();
  }

  ionViewWillLeave(): void {
    this.veioDeUmaRotaAnterior = false;
  }

  /**
   * @description Identificar e definir se veio de uma tela anterior do app ou acessou diretamente.
   */
  public definirSeVeioDeUmaRotaAnterior(): void {

    if (this.informacoes.rotaAnterior) {
      this.veioDeUmaRotaAnterior = true;
    } else {
      this.veioDeUmaRotaAnterior = false;
    }
  }

  /**
   * @description Retornar para tela de onde veio.
   */
  public retornarPara(): void {
    if (this.veioDeUmaRotaAnterior) {
      this.navCtrl.back();
    } else {
      this.navCtrl.navigateRoot(['qual-a-boa']);
    }
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.informacoes$.subscribe((res: IAppState) => {
      this.informacoes = res;
      this.preencherPrimeiroNome(this.informacoes.primeiroNome);
    })
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
      header: 'Alteração',
      message: 'Seu novo nome foi definido.',
      duration: 3000
    })

    await toast.present();

    return toast;
  }

  public async mostrarInformativoDosDados(): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      subHeader: 'Atenção',
      message: `O nome que você definir é como nós te chamaremos dentro do app. Essa informação não é gravada em nenhum servidor, apenas na memória do navegador.`,
      buttons: ['Entendi']
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

  public async mostrarUtilidadeDoNome(): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      subHeader: 'Importância do nome',
      message: `No momento não utilizamos seu nome para nada`,
      buttons: ['Entendi']
    })

    await alert.present();

    return alert;
  }
}
