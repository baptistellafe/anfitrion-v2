import { IAppState } from 'src/app/store/app/app.state';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { UtilsService } from './services/utils.service';
import { Store } from '@ngrx/store';
import * as AppStore from './store/app/app.state';
import { Observable } from 'rxjs';
import { StorageService } from './services/storage.service';
import { CIDADE_ESCOLHIDA_KEY, IDIOMA_KEY, JA_ACESSOU_ANFITRION_KEY, PRIMEIRO_NOME_KEY } from './consts/keys';
import { AppConfigService } from './services/app-config.service';

@Component({
  selector: 'anf-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public opcoesDoMenu: any[];
  public itemSelecionado: any;

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState;

  constructor(
    public menuCtrl : MenuController,
    private navCtrl : NavController,
    private utilsService : UtilsService,
    private store : Store,
    private storageService : StorageService,
    private appCfg : AppConfigService
  ) {}

  async ngOnInit() {
    this.obterOpcoesDoMenu();
    await this.recuperarInformacoesDaStorage();
    this.definirSaudacao();
    this.obterTodasAsInformacoes();
  }

  /**
   * @description Define o item selecionado no menu.
   */
  public definirItem(itemDoMeu: any): void {
    this.itemSelecionado = itemDoMeu;
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
   * @description Resgata informações da Storage e se encontrar/existir guarda no NGRX para ser usado no app.
   */
  public async recuperarInformacoesDaStorage() {
    let primeiroNome = await this.storageService.obterChave(PRIMEIRO_NOME_KEY);
    let jaAcessouAnfitrion = await this.storageService.obterChave(JA_ACESSOU_ANFITRION_KEY);
    let idioma = await this.storageService.obterChave(IDIOMA_KEY);
    let cidadeEscolhida = await this.storageService.obterChave(CIDADE_ESCOLHIDA_KEY);

    if (primeiroNome) {
      let props = { primeiroNome: primeiroNome };
      this.store.dispatch(AppStore.definirPrimeiroNome(props));
    }

    if (jaAcessouAnfitrion) {
      let props = { jaAcessouAnfitrion: jaAcessouAnfitrion }
      this.store.dispatch(AppStore.definirPrimeiroAcesso(props));
    }

    if (idioma) {
      let props = { idioma: idioma }
      this.store.dispatch(AppStore.definirIdioma(props));
    }

    if (cidadeEscolhida) {
      let props = { cidadeEscolhida: cidadeEscolhida }
      this.store.dispatch(AppStore.definirCidade(props));
    }
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
   * @description Obtém as opções do menu.
   */
  public obterOpcoesDoMenu() {
    this.opcoesDoMenu = this.appCfg.obterOpcoesDoMenu();
  }
}
