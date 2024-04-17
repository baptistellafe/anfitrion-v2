import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonContent, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { IAppState } from 'src/app/store/app/app.state';
import Swiper from 'swiper';
import * as AppStore from './../../store/app/app.state';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/Categoria';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'anf-qual-a-boa',
  templateUrl: './qual-a-boa.page.html',
  styleUrls: ['./qual-a-boa.page.scss'],
})
export class QualABoaPage implements OnInit, OnDestroy {
  @ViewChild('conteudoQualAboa') conteudoQualAboa: IonContent;


  public categoriaSelecionada: any;

  @ViewChild('qualaboaSwiper') qualaboaSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: any = 0;

  @ViewChild('qualaboaDescricaoSwiper') qualaboaDescricaoSwiper?: ElementRef<{ swiper: Swiper }>

  public categorias: Categoria[] = [];

  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  public rotaAtual: string | string[] = this.router.url;

  public mostrarControladoresDoSwiper: boolean = false;
  public mostrarBotaoCategoria: boolean = false;
  public mostrarAvisoSemCategorias: boolean = false;
  public carregandoCategorias: boolean = false;

  constructor(
    private navCtrl : NavController,
    private title : Title,
    private utilsService : UtilsService,
    private store : Store,
    private router : Router,
    private appConfig : AppConfigService
    ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
  }

  ionViewWillLeave(): void {
    this.indexAtual = 0;
  }

  ionViewDidEnter(): void {
    this.title.setTitle(`Qual a boa pra hoje ${this.informacoes.cidadeEscolhida.location[this.informacoes.idioma.value]}`);
  }

  public trocarCidade(): void {
    this.navCtrl.navigateForward('/trocar-cidade');
  }

  public obterCategorias(cidade: string): void {
    if (!this.categorias.length) {
      this.carregandoCategorias = true;
    }

    setTimeout(() => {
      this.categorias = this.appConfig.obterCategorias(cidade);

      if (this.categorias.length === 0) {
        this.mostrarAvisoSemCategorias = true;
        this.mostrarBotaoCategoria = false;
        this.mostrarControladoresDoSwiper = false;
      } else if (this.categorias.length === 1) {
        this.definirSlideInicial();
        this.mostrarBotaoCategoria = true;
        this.mostrarAvisoSemCategorias = false;
      } else {
        this.definirSlideInicial();
        this.mostrarBotaoCategoria = true;
        this.mostrarControladoresDoSwiper = true;
        this.mostrarAvisoSemCategorias = false;
      }

      this.carregandoCategorias = false;
    }, 3000);
  }

  public selecionarCategoria(index: number): void {
    this.indexAtual = index;
    this.categoriaSelecionada = this.categorias[this.indexAtual]
    this.pularSlidePara(this.indexAtual);
  }

  /**
  @description Obtém o index ativo do swiper.
  */
  public obterIndexAtualDoSwiper() {
    this.indexAtual = this.utilsService.obterIndexAtualDoSwiper(this.qualaboaSwiper);
  }

  /**
  @description Pula para o slide selecionado.
  */
  public pularSlidePara(index: number): void {
    this.utilsService.pularSlidePara(index, this.qualaboaSwiper);
    this.utilsService.pularSlidePara(index, this.qualaboaDescricaoSwiper)
  }

  /**
  @description Avança o swiper.
  */
  public avancarSwiper(): void {
    this.utilsService.avancarSwiper(this.qualaboaSwiper);
    this.utilsService.avancarSwiper(this.qualaboaDescricaoSwiper);
  }

  /**
  @description Retrocede o swiper.
  */
  public retrocederSwiper(): void {
    this.utilsService.retornarSwiper(this.qualaboaSwiper);
    this.utilsService.retornarSwiper(this.qualaboaDescricaoSwiper);
  }

  public irPara(categoria: any): void {
    if (categoria.value === 'sugestoes') {
      this.navCtrl.navigateForward(['sugestoes']);
    } else {
      this.navCtrl.navigateForward(['qual-a-boa', categoria.value]);
    }
  }

   /**
    @description Responsável por levar o usuário ao topo da tela.
  */
    public scrollarConteudoParaTopo(conteudo: IonContent, velocidade: number): void {
      this.utilsService.scrollarConteudoParaTopo(conteudo, velocidade);
    }

  /**
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.inscricaoInformacoes = this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;

      if (this.informacoes.cidadeEscolhida.value) {
        this.obterCategorias(this.informacoes.cidadeEscolhida.value);
      }
    })
  }

  public definirRotaAnterior(): void {
    this.utilsService.definirRotaAnterior(this.rotaAtual)
  }

  public definirCategoriaNaMudancaDoSlide(): void {
    this.obterIndexAtualDoSwiper();
    this.categoriaSelecionada = this.categorias[this.indexAtual];
  }

  public definirSlideInicial(): void {
    this.categoriaSelecionada = this.categorias[this.indexAtual];
    this.pularSlidePara(this.indexAtual)
  }

  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
  }
}
