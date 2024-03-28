import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { JA_ACESSOU_ANFITRION_KEY } from 'src/app/consts/keys';
import { StorageService } from 'src/app/services/storage.service';
import { IAppState, definirPrimeiroAcesso } from 'src/app/store/app/app.state';

@Component({
  selector: 'anf-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  public primeiroAcesso: boolean = true;

  constructor(
    private navCtrl : NavController,
    private title : Title,
    private storageService : StorageService,
    private store : Store<{ app: IAppState }>
  ) { }

  async ngOnInit() {
    await this.identificarPrimeiroAcesso();
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Bem vindo ao Anfitrion.')
  }

  /**
   * @description Ir para a tela: Início.
   */
  public irParaTela(tela: string): void {
    setTimeout(() => {
      this.navCtrl.navigateForward(`/${tela}`);
    }, 5000);
  }

  /**
    @description Identificar se é o primeiro acesso do usuário e direcionar para a tela correta.
  */
  public async identificarPrimeiroAcesso() {
    let jaAcessouAnfitrion = await this.storageService.obterChave(JA_ACESSOU_ANFITRION_KEY);

    if (jaAcessouAnfitrion) {
      this.store.dispatch(definirPrimeiroAcesso({ jaAcessouAnfitrion }))
      this.irParaTela('inicio');
    } else {
      this.irParaTela('primeiro-acesso');
    }
  }

}
