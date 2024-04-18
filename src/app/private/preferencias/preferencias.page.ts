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

  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  public traducaoDaTela: any;
  private traducaoDaTela$: Observable<any>;
  private inscricaoTraducaoDaTela: Subscription;

  public cidades: Cidade[];

  public configuracaoDoAlertaDeCidade: AlertOptions = {
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
    this.obterCidades();
    this.obterIdiomas();
  }

  public obterIdiomas(): void {
    this.idiomas = this.appConfig.obterIdiomas();
  }

  public obterCidades(): void {
    this.cidades = this.appConfig.obterCidades();
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   * Neste caso precisamos já ir definindo algumas coisas como: Cidade inicial, Idioma inicial e tradução da tela.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.inscricaoInformacoes = this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;
      this.identificarCidadeInicial(this.informacoes.cidadeEscolhida);
      this.identificarIdiomaInicial(this.informacoes.idioma);
      this.obterTraducaoDaTela();
    })
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

      this.obterTraducaoDaTela();

      setTimeout(() => {
        this.mostrarNotificacao();
      }, 500);
    }
  }

  public async mostrarAlertaParaConfirmarMudancas(): Promise<HTMLIonAlertElement> {
    this.mudancasPendenteDeConfirmacao = true;

    const alert = await this.alertCtrl.create({
      mode: 'ios',
      subHeader: `${this.traducaoDaTela?.ALERTA_MUDANCAS.HEADER}`,
      message: `${this.traducaoDaTela?.ALERTA_MUDANCAS.MENSAGEM}`,
      buttons: [{
        text: `${this.traducaoDaTela?.ALERTA_MUDANCAS.BOTAO_CANCELAR}`,
        role: 'cancel',
        handler: () => {
          this.cancelouAlteracoes();
        }
      },{
        text: `${this.traducaoDaTela?.ALERTA_MUDANCAS.BOTAO_CONFIRMAR}`,
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
      header: this.traducaoDaTela.NOTIFICACAO_PREFERENCIAS_ATUALIZADAS.HEADER,
      message: this.traducaoDaTela.NOTIFICACAO_PREFERENCIAS_ATUALIZADAS.MENSAGEM,
      duration: 3000
    })

    await toast.present();
    return toast;
  }

  /**
   * @description Define o novo idioma em todo o app.
   */
  public confirmarNovoIdioma(idioma: string): void {
    this.translateApp.definirIdioma(idioma);
  }

  /**
   * @description Retorna para a tela de origem ou tela principal do app.
   */
  public retornarPara(): void {
    if (this.informacoes.rotaAnterior) {
      this.navCtrl.navigateBack(this.informacoes.rotaAnterior);
    } else {
      this.navCtrl.navigateRoot(['qual-a-boa']);
    }
  }

  /**
   * @description Obtém a tradução da tela para ser usado no TS.
   * Neste caso precisamos ja ir configurando algumas coisas pos essa tela troca o idioma, como:
   * Alerta de Troca de Cidade, título da tela.
   */
  public obterTraducaoDaTela(): void {
    this.traducaoDaTela$ = this.translate.get('TELA_PREFERENCIAS');
    this.inscricaoTraducaoDaTela = this.traducaoDaTela$
    .subscribe((res: any) => {
      this.traducaoDaTela = res;
      this.configurarAlertaDeTrocaDeCidade(this.traducaoDaTela);
      this.title.setTitle(`${this.traducaoDaTela?.TITULO_TELA}`)
    })
  }

  public configurarAlertaDeTrocaDeCidade(traducao: any): void {
    this.configuracaoDoAlertaDeCidade = {
      backdropDismiss: false,
      subHeader: traducao.SELETOR_DE_CIDADES.TITULO,
      message: traducao.SELETOR_DE_CIDADES.DESCRICAO
    }
  }

  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
    this.inscricaoTraducaoDaTela.unsubscribe();
  }
}
