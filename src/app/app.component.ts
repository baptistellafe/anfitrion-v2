import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'anf-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public primeiroAcesso: boolean = true;

  constructor(
    private navCtrl : NavController,
    private platformCtrl : Platform
  ) {}

  ngOnInit(): void {
    this.definirSeVaiParaSplashScreen();
  }

  /**
   * @description Ir para a splash screen.
   */
  public irParaSplashScreen(): void {
    this.navCtrl.navigateForward('/splash-screen');
  }

  /**
   * @description Ir para o primeiro acesso.
   */
  public irParaPrimeiroAcesso(): void {
    this.navCtrl.navigateForward('/primeiro-acesso');
  }

  /**
   * @description Ir para o início.
   */
  public irParaInicio(): void {
    this.navCtrl.navigateForward('/inicio');
  }

  /**
   * @description Define se aparece a splash screen.
   * Neste caso colocamos somente para mobile.
   */
  public definirSeVaiParaSplashScreen(): void {
    if ((this.platformCtrl.is('mobile') || this.platformCtrl.is('mobileweb')) && this.primeiroAcesso) {
      this.irParaSplashScreen();
    }
  }
}
