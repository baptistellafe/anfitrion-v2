import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Idioma } from 'src/app/interfaces/Idioma';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'anf-language-button-just-icon',
  templateUrl: './language-button-just-icon.component.html',
  styleUrls: ['./language-button-just-icon.component.scss'],
})
export class LanguageButtonJustIconComponent  implements OnInit {

  @Input() origem: string;
  @Input() darkMode: boolean;

  constructor(
    private navCtrl : NavController
  ) { }

  ngOnInit() {

  }

  /**
   * @description Leva o usuário para a tela: Troca de idioma.
   * @param rota obrigatório do tipo string[].
   */
  public irPara(rota: string[]): void {
    this.navCtrl.navigateForward(rota)
  }

}
