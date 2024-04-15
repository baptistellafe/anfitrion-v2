import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  public horaAtual : number = moment().hour();
  public categorias: any[];

  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;


  public rotaAtual: string | string[] = this.router.url;

  constructor(
    private navCtrl : NavController,
    private title : Title,
    private utilsService : UtilsService,
    private store : Store,
    private router : Router
    ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
    this.obterCategorias();
  }

  ionViewWillEnter(): void {
    this.definirSlideInicial();
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

  public obterCategorias(): void {
    this.categorias = [
      {
        icone: 'beer',
        texto: {
          pt: 'Bares',
          en: 'Bars',
          es: 'Barito'
        },
        value: 'bares',
        descricao: {
          pt: 'bares, botecos e pubs.',
          en: 'bar and pubs.',
          es: 'barizots, boteqitops e pb.'
        },
        especial: false
      },
      {
        icone: 'restaurant',
        texto: {
          pt: 'Restaurantes',
          en: 'Restaurants',
          es: 'Restaurantito'
        },
        value: 'restaurantes',
        descricao: {
          pt: 'comida japonesa, mexicana, etc...',
          en: 'japan food, mexican food, etc...',
          es: 'japonesito, mexicanito, etc...'
        },
        especial: false
      },
      {
        icone: 'fast-food',
        texto: {
          pt: 'Hamburguerias',
          en: 'Burguer place',
          es: 'Hamburguerita'
        },
        value: 'hamburguerias',
        descricao: {
          pt: 'hamburguer, fast-food...',
          en: 'hamburguer, fast-food...',
          es: 'hamburguer, comidita rapidita, etc...'
        },
        especial: false
      },
      {
        icone: 'pizza',
        texto: {
          pt: 'Pizzarias e esfiharias',
          en: 'Pizza and esfihas',
          es: 'Pizzitas e esfihitas'
        },
        value: 'pizzarias-e-esfihas',
        descricao: {
          pt: 'pizzas, esfihas, brotos, etc...',
          en: 'pizzas, esfihas, etc...',
          es: 'pizzitas, esfihitas, etc...'
        },
        especial: false
      },
      {
        icone: 'musical-notes',
        texto: {
          pt: 'Casas noturnas',
          en: 'Nightclubs',
          es: 'Casas nocturnas'
        },
        value: 'casasnoturnas',
        descricao: {
          pt: 'música ao vivo, dj, etc...',
          en: 'live music, dj, etc...',
          es: 'musiquita ao vivo, djzito, etc...'
        },
        especial: false
      },
      {
        icone: 'wine',
        texto: {
          pt: 'Adegas',
          en: 'Wine Houses',
          es: 'Casa de bebidas'
        },
        value: 'adegas',
        descricao: {
          pt: 'combo de bebida, gelo, etc...',
          en: 'drink comb, ice, etc...',
          es: 'combito de bebida, gelito, etc...'
        },
        especial: false
      },
      {
        icone: 'flame',
        texto: {
          pt: 'Tabacarias',
          en: 'Smoke House',
          es: 'Tabacarita'
        },
        value: 'tabacarias',
        descricao: {
          pt: 'vape, narguile, seda, etc...',
          en: 'vaps, narguils, seds...',
          es: 'vapito, narguilito, sedita, etc...'
        },
        especial: false
      },
      {
        icone: 'qr-code',
        texto: {
          pt: 'Sugestões',
          en: 'Sugesttions',
          es: 'Suggests'
        },
        value: 'sugestoes',
        descricao: {
          pt: 'poupar tempo',
          en: 'save your time',
          es: 'salve tu tiempo'
        },
        especial: true
      }
    ]
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
