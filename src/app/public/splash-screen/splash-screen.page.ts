import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, skip, take, takeLast } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'anf-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState = AppStore.appInitialState;

  constructor(
    private navCtrl : NavController,
    private title : Title,
    private store : Store
  ) { }

  ionViewWillEnter(): void {
  }

  ngOnInit() {
    this.obterTodasAsInformacoes();
  }

  ionViewDidEnter(): void {
    this.title.setTitle(`anfitrion`)
  }

  /**
   * @description Ir para a tela: Início.
   */
  public irParaTela(tela: string): void {
    setTimeout(() => {
      this.navCtrl.navigateForward(`${tela}`);
    }, 4000);
  }

  /**
    @description Identificar se é o primeiro acesso do usuário e direcionar para a tela correta.
  */
  public identificarPrimeiroAcesso(jaAcessou: boolean): void {
    if (jaAcessou) {
      this.irParaTela('/qual-a-boa');
    } else {
      this.irParaTela('/primeiro-acesso');
    }
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   * Neste caso específico usamos o skip(1) para identificar se já acessou.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes)

    this.informacoes$
    .pipe(skip(1))
    .subscribe((res: IAppState) => {
      this.informacoes = res;
      this.identificarPrimeiroAcesso(this.informacoes.jaAcessouAnfitrion);
    })
  }
}
