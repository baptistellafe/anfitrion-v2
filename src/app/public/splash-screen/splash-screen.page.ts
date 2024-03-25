import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'anf-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  public primeiroAcesso: boolean = true;

  constructor(
    private navCtrl : NavController,
    private platformCtrl : Platform,
    private title : Title
  ) { }

  ngOnInit() {
    this.mostrarSplashScreen();
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Bem vindo ao Anfitrion.')
  }

  /**
   * @description Ir para a tela: Início.
   */
  public irParaInicio(): void {
    this.navCtrl.navigateForward('/inicio');
  }

  /**
   * @description Ir para a tela: Primeiro acesso.
   */
  public irParaPrimeiroAcesso(): void {
    this.navCtrl.navigateForward('/primeiro-acesso');
  }

  /**
   * @description Identifica se é o primeiro acesso.
   * Nesse caso direciona para o início do app ou para a tela de primeiro acesso.
   */
  public direcionarParaTelaDeAcordoComAcesso(): void {
    if (this.primeiroAcesso) {
      this.irParaPrimeiroAcesso();
    } else {
      this.irParaInicio();
    }
  }

  /**
   * @description Identificar se está no mobile e direcionar o usuário.
   */
  public mostrarSplashScreen(): void {
    if (this.platformCtrl.is('mobile') || this.platformCtrl.is('mobileweb')) {
      setTimeout(() => {
        this.direcionarParaTelaDeAcordoComAcesso();
      }, 5000);
    } else {
      this.direcionarParaTelaDeAcordoComAcesso();
    }
  }

}
