import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import { Store } from '@ngrx/store';
@Component({
  selector: 'anf-boas-vindas',
  templateUrl: './boas-vindas.page.html',
  styleUrls: ['./boas-vindas.page.scss'],
})
export class BoasVindasPage implements OnInit {
  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState;

  constructor(
    private title : Title,
    private renderer: Renderer2,
    private navCtrl : NavController,
    private store : Store
  ) { }

  ngOnInit(): void {
    this.obterTodasAsInformacoes();
  }

  ionViewWillEnter(): void {
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

  /**
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.informacoes$.subscribe((res: IAppState) => {
      this.informacoes = res;
    })
  }

}
