import { IAppState } from 'src/app/store/app/app.state';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { UtilsService } from './services/utils.service';
import { Store } from '@ngrx/store';
import * as AppStore from './store/app/app.state';
import { Observable, take } from 'rxjs';
import { StorageService } from './services/storage.service';
import { CIDADE_ESCOLHIDA_KEY, IDIOMA_KEY, JA_ACESSOU_ANFITRION_KEY, PRIMEIRO_NOME_KEY } from './consts/keys';
import { AppConfigService } from './services/app-config.service';
import { Router } from '@angular/router';
import { TranslateAnfService } from './services/translate-anf.service';

@Component({
  selector: 'anf-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public opcoesDoMenu: any[];
  public itemSelecionado: any;

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState = AppStore.appInitialState;

  constructor(
    public menuCtrl : MenuController,
    private navCtrl : NavController,
    private utilsService : UtilsService,
    private store : Store,
    private storageService : StorageService,
    private appCfg : AppConfigService,
    private router : Router,
    private translateApp : TranslateAnfService
  ) {}

  async ngOnInit() {
    await this.identificarPrimeiroAcesso();
    this.definirIdiomaInicial();
    this.bloquearSwiperDoMenu();
    this.obterOpcoesDoMenu();
    this.definirSaudacao();
    this.obterTodasAsInformacoes();
  }

  /**
   * @description Define o item selecionado no menu.
   */
  public definirItem(itemDoMeu: any): void {
    this.itemSelecionado = itemDoMeu;

    // A ROTA ATUAL SERÁ DEFINIDA COMO ROTA ANTERIOR NA PRÓXIMA TELA.
    let rotaAtual: string = this.router.url;
    let rotaAnterior: string = rotaAtual;

    // QUANDO VAI PARA PREFERÊNCIAS DEVEMOS SETAR A ROTA PARA SER USADO NO BOTÃO VOLTAR
    // É UMA PÁGINA ABSTRATA.
    if (this.itemSelecionado.rota === 'preferencias') {
      this.utilsService.definirRotaAnterior(rotaAnterior);
    }
  }

  /**
   * @description Direciona para outra tela.
   */
  public irPara(rota: any): void {
    this.navCtrl.navigateForward(rota);
  }

  /**
   * @description Fecha o menu.
   */
  public fecharMenu(): void {
    this.menuCtrl.close();
  }

  /**
   * @description Define a saudação: Bom dia, boa tarde e boa noite.
   */
  public definirSaudacao(): void {
    this.utilsService.definirSaudacaoDeAcordoComHorario();
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;
    })
  }

  /**
   * @description Obtém as opções do menu.
   */
  public obterOpcoesDoMenu() {
    this.opcoesDoMenu = this.appCfg.obterOpcoesDoMenu();
  }

  /**
   * @description Direcionar o usuário para a tela: Editar dados.
   */
  public definirRotaAnterior(): void {
    let rotaAtual: string = this.router.url;
    let rotaAnterior: string = rotaAtual;
    this.utilsService.definirRotaAnterior(rotaAnterior);
  }

  /**
   * @description Direcionar o usuário para a tela: Editar dados.
   */
  public irParaEditarDados(): void {
    this.irPara(['editar-dados']);
    this.definirRotaAnterior();
  }

  /**
   * @description Bloquea o gesto 'swipe' do menu.
   */
  public bloquearSwiperDoMenu(): void {
    this.menuCtrl.swipeGesture(false)
  }

  /**
   * @description Define o idioma inicial do app.
   */
  public definirIdiomaInicial(): void {
    this.translateApp.definirIdiomaInicial();
  }

  /**
   * @description Identifica se é o primeiro acesso do usuário.
   */
  public async identificarPrimeiroAcesso() {
    return await this.utilsService.identificarPrimeiroAcesso();
  }
}
