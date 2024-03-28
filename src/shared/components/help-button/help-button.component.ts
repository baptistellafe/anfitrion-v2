import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DuvidasFrequentesPage } from 'src/app/public/duvidas-frequentes/duvidas-frequentes.page';

@Component({
  selector: 'anf-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
})
export class HelpButtonComponent  implements OnInit {

  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {}

  public async abrirDuvidasFrequentes(): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create({
      component: DuvidasFrequentesPage,
      mode: 'md',
      cssClass: 'duvidas'
    });
    modal.present();

    await modal.present();

    return modal;
  }

}
