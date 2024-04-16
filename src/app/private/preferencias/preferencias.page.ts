import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import { AlertController, AlertOptions, NavController, ToastController } from '@ionic/angular';
import { Cidade } from 'src/app/interfaces/Cidade';
import { Idioma } from 'src/app/interfaces/Idioma';
import { AppConfigService } from 'src/app/services/app-config.service';
import { StorageService } from 'src/app/services/storage.service';
import { CIDADE_ESCOLHIDA_KEY, IDIOMA_KEY } from 'src/app/consts/keys';
import { TranslateAnfService } from 'src/app/services/translate-anf.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anf-preferencias',
  templateUrl: './preferencias.page.html',
  styleUrls: ['./preferencias.page.scss'],
})
export class PreferenciasPage implements OnInit, OnDestroy {

  public idiomas: Idioma[];
  public idiomaSelecionado: Idioma;

  public cidadeEscolhida: Cidade;

  public mudancasPendenteDeConfirmacao: boolean = false;
  public houveMudancaEmAlgumSeletor: boolean = false;
  public veioDeUmaRotaAnterior: boolean = false;

  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  public cidades: Cidade[];

  public cityButtonAlertOptions: AlertOptions = {
    subHeader: this.translate.instant('COMPONENTS.SELETOR_DE_CIDADES.TITULO'),
    message: this.translate.instant('COMPONENTS.SELETOR_DE_CIDADES.DESCRICAO'),
    backdropDismiss: false
  }

  constructor(
    private title : Title,
    private store : Store,
    public navCtrl : NavController,
    public appConfig : AppConfigService,
    private storageService : StorageService,
    private alertCtrl : AlertController,
    private toastCtrl : ToastController,
    private translateApp : TranslateAnfService,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
    this.cidades = this.appConfig.obterCidades();
    this.idiomas = this.appConfig.obterIdiomas();
  }

  ionViewDidEnter(): void {
    this.title.setTitle('Preferências');
    this.definirSeVeioDeUmaRotaAnterior();
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
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.inscricaoInformacoes = this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;
      this.identificarCidadeInicial(this.informacoes.cidadeEscolhida);
      this.identificarIdiomaInicial(this.informacoes.idioma);
    })
  }

  /**
   * @description Retorna para a tela anterior mas existem alguns cenários.
   Cenário 1: veio de outra tela e já preencheu informações no site.
   Cenário 2: veio de outra tela mas não tenha preenchido (dificil mas possível)
   Cenário 3: entrou direto na tela mas tem alguma informação faltando.
   Cenário 4: entrou direto na tela mas nunca acessou o app antes.
   */
  public retornarPara(): void {
    if (this.veioDeUmaRotaAnterior && this.informacoes.jaAcessouAnfitrion && this.informacoes.cidadeEscolhida.value && this.informacoes.idioma.value) {
      this.navCtrl.back();
    } else if (this.veioDeUmaRotaAnterior && (!this.informacoes.jaAcessouAnfitrion || !this.informacoes.cidadeEscolhida.value || this.informacoes.idioma.value)) {
      this.navCtrl.navigateRoot(['qual-a-boa']);
    } else if (!this.veioDeUmaRotaAnterior && this.informacoes.jaAcessouAnfitrion || this.informacoes.cidadeEscolhida.value || this.informacoes.idioma.value) {
      this.navCtrl.navigateRoot(['qual-a-boa']);
    } else {
      this.navCtrl.navigateRoot(['primeiro-acesso']);
    }
  }

  /**
   * @description Direciona o usuário para outra tela.
   * @param rota obrigatório do tipo string ou string[].
   */
  public irPara(rota: string | string[]): void {
    this.navCtrl.navigateForward(rota)
  }

  /**
   * @description Vai definir a cidade na variável local.
   * @param cidade obrigatório do tipo Cidade.
   */
  public identificarCidadeInicial(cidade: Cidade): void {
    if (cidade) { this.cidadeEscolhida = cidade; }
  }

  /**
   * @description Vai definir o idioma na variável local.
   * @param idioma obrigatório do tipo Idioma.
   */
  public identificarIdiomaInicial(idioma: Idioma): void {
    if (idioma) { this.idiomaSelecionado = idioma; }
  }

  /**
   * @description Responsável por "limpar" a troca que foi feito, voltando para o que está guardando no NGRX.
   * Idioma e cidade escolhida.
   * @param e obrigatório do tipo evento.
   */
  public cancelouAlteracoes(): void {
    this.cidadeEscolhida = this.informacoes.cidadeEscolhida;
    this.idiomaSelecionado = this.informacoes.idioma;
    this.houveMudancaEmAlgumSeletor = false;
    this.mudancasPendenteDeConfirmacao = false;
  }

  /**
   * @description Vai definir o idioma TEMPORÁRIO, até confirmar alterações.
   * @param obrigatório do tipo Idioma.
   */
  public definirIdioma(lang: Idioma): void {
    this.houveMudancaEmAlgumSeletor = true;
    this.idiomaSelecionado = lang;
  }

  /**
   * @description Vai definir a cidade TEMPORÁRIA, até confirmar alterações.
   * @param e obrigatório do tipo evento.
   */
  public definirCidade(): void {
    this.houveMudancaEmAlgumSeletor = true;
  }

  /**
   * @description Função para comparar o que foi selecionado no seletor.
   * Fornecido pelo próprio exemplo do Ionic.
   * @param city1 obrigatório do tipo Cidade.
   * @param city2 obrigatório do tipo Cidade.
   */
  public compararCidades(cidade1: Cidade, cidade2: Cidade): boolean {
    return cidade1 && cidade2 ? cidade1.value === cidade2.value : cidade1 === cidade2;
  }

  /**
   * @description Confirmar alterações realizadas caso tenham alterado alguma informação.
   * No caso do idioma, precisamos mudar o idioma de forma geral.
   */
  public confirmarAlteracoes(): void {
    if (this.houveMudancaEmAlgumSeletor) {
      let preferencias: { idioma: Idioma, cidadeEscolhida: Cidade } = {
        idioma: this.idiomaSelecionado,
        cidadeEscolhida: this.cidadeEscolhida
      }

      this.store.dispatch(AppStore.definirPreferencias({ preferencias }));
      this.storageService.armazenarChave(CIDADE_ESCOLHIDA_KEY, this.cidadeEscolhida);

      this.confirmarNovoIdioma(this.idiomaSelecionado.value);

      this.mudancasPendenteDeConfirmacao = false;
      this.houveMudancaEmAlgumSeletor = false;

      this.mostrarNotificacao();
    }
  }

  public async mostrarAlertaParaConfirmarMudancas(): Promise<HTMLIonAlertElement> {
    this.mudancasPendenteDeConfirmacao = true;

    const alert = await this.alertCtrl.create({
      mode: 'ios',
      subHeader: 'Mudanças',
      message: `Trocaremos a cidade para ${this.cidadeEscolhida.text} e o idioma para ${this.idiomaSelecionado.text[this.informacoes.idioma.value]}`,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.cancelouAlteracoes();
        }
      },{
        text: 'Confirmar',
        role: 'confirm',
        handler: () => {
          this.confirmarAlteracoes();
        }
      }]
    })

    await alert.present();

    return alert;
  }

  public async mostrarNotificacao(): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      icon: 'settings-outline',
      mode: 'ios',
      translucent: false,
      position: 'top',
      cssClass: 'default',
      header: 'Alteração',
      message: 'Suas preferências foram atualizadas.',
      duration: 3000
    })

    await toast.present();

    return toast;
  }

  public confirmarNovoIdioma(idioma: string): void {
    this.translateApp.definirIdioma(idioma);
  }

  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
  }
}
