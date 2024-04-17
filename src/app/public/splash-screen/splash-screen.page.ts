import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'anf-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit, OnDestroy {
  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  private inscricaoInformacoes: Subscription;

  constructor(
    private navCtrl : NavController,
    private store : Store
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
  }

  /**
   * @description Ir para a tela: Início.
   */
  public irParaTela(tela: string | string[]): void {
    setTimeout(() => {
      this.navCtrl.navigateRoot(`${tela}`);
    }, 4000);
  }

  public direcionarUsuario(): void {
    if (this.informacoes.jaAcessouAnfitrion) {
      this.irParaTela(['qual-a-boa'])
    } else {
      this.irParaTela(['primeiro-acesso'])
    }
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   * Neste caso específico usamos o skip(1) para identificar se já acessou.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes)
    this.inscricaoInformacoes = this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;
      this.direcionarUsuario();
    })
  }

  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
  }
}
