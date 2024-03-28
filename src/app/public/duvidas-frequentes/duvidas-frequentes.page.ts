import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'anf-duvidas-frequentes',
  templateUrl: './duvidas-frequentes.page.html',
  styleUrls: ['./duvidas-frequentes.page.scss'],
})
export class DuvidasFrequentesPage implements OnInit {

  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }

  /**
   * @description Fechar modal.
   */
  public fecharModal(): void {
    this.modalCtrl.dismiss();
  }

}
