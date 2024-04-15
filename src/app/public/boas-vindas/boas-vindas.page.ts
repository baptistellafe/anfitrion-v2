import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Observable, Subscription, take } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'anf-boas-vindas',
  templateUrl: './boas-vindas.page.html',
  styleUrls: ['./boas-vindas.page.scss'],
})
export class BoasVindasPage implements OnInit, OnDestroy {

  public informacoes: IAppState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  public traducaoDaTela: any;
  public traducaoDaTela$: Observable<any>;
  public inscricaoTraducaoDaTela: Subscription;

  constructor(
    private title : Title,
    private renderer: Renderer2,
    private navCtrl : NavController,
    private store : Store,
    private translate : TranslateService
  ) { }

  ngOnInit(): void {
    this.obterTodasAsInformacoes();
    this.obterTraducaoDaTela();
  }

  ionViewDidEnter(): void {
    this.animarElementos();
    this.title.setTitle(`${this.traducaoDaTela?.TITULO}`)
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
    this.inscricaoInformacoes = this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;
    })
  }

  /**
   * @description Obtém a tradução da tela para ser usado no TS.
   * Neste caso não precisa se desinscrever por causa do Take(1).
   */
  public obterTraducaoDaTela(): void {
    this.traducaoDaTela$ = this.translate.get('TELA_BOAS_VINDAS');
    this.inscricaoTraducaoDaTela = this.traducaoDaTela$
    .subscribe((res: any) => {
      this.traducaoDaTela = res;
    })
  }

  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
    this.inscricaoTraducaoDaTela.unsubscribe();
  }

}
