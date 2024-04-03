import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'anf-boas-vindas',
  templateUrl: './boas-vindas.page.html',
  styleUrls: ['./boas-vindas.page.scss'],
})
export class BoasVindasPage implements OnInit {

  constructor(
    private title : Title,
    private renderer: Renderer2,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
    this.title.setTitle(`Bem vindo(a)`);
  }

  ionViewDidEnter(): void {
    this.animarElementos()
  }

  /**
   * @description Animar elementos na tela, um de cada vez.
   */
  public animarElementos(): void {
    let elementos = document.querySelectorAll('.animate_anf');

    elementos.forEach((elemento, i) => {
      let index = i + 1;
      this.renderer.addClass(elemento, 'animate__fadeIn');
      this.renderer.addClass(elemento, `animacao_${index}`);
    })

    this.irParaInicio();

  }

  /**
   * @description Ir para a tela: Início
   */
  public irParaInicio(): void {
    setTimeout(() => {
      this.navCtrl.navigateRoot('/qual-a-boa');
    }, 3000);
  }

}
