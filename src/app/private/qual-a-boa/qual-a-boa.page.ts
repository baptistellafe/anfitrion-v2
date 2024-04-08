import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonContent, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
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
export class QualABoaPage implements OnInit {
  @ViewChild('conteudoQualAboa') conteudoQualAboa: IonContent;

  public categoriaSelecionada: any;

  @ViewChild('qualaboaSwiper') qualaboaSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: any = 0;

  @ViewChild('qualaboaDescricaoSwiper') qualaboaDescricaoSwiper?: ElementRef<{ swiper: Swiper }>

  public horaAtual : number = moment().hour();
  public categorias: any[];

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState;

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
    console.log(this.horaAtual);
    this.obterCategorias();
    this.selecionarCategoria(this.categorias[0], this.indexAtual);
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
          pt: 'Bares'
        },
        value: 'bares',
        descricao: {
          pt: 'bares, botecos e pubs.'
        },
        especial: false
      },
      {
        icone: 'restaurant',
        texto: {
          pt: 'Restaurantes'
        },
        value: 'restaurantes',
        descricao: {
          pt: 'comida japonesa, mexicana, etc...'
        },
        especial: false
      },
      {
        icone: 'fast-food',
        texto: {
          pt: 'Hamburguerias'
        },
        value: 'hamburguerias',
        descricao: {
          pt: 'hamburguer, fast-food...'
        },
        especial: false
      },
      {
        icone: 'pizza',
        texto: {
          pt: 'Pizzarias e esfiharias'
        },
        value: 'pizzarias-e-esfihas',
        descricao: {
          pt: 'pizzas, esfihas, brotos, etc...'
        },
        especial: false
      },
      {
        icone: 'musical-notes',
        texto: {
          pt: 'Casas noturnas'
        },
        value: 'casasnoturnas',
        descricao: {
          pt: 'música ao vivo, etc...'
        },
        especial: false
      },
      {
        icone: 'wine',
        texto: {
          pt: 'Adegas'
        },
        value: 'adegas',
        descricao: {
          pt: 'combo de bebida, gelo, etc...'
        },
        especial: false
      },
      {
        icone: 'flame',
        texto: {
          pt: 'Tabacarias'
        },
        value: 'tabacarias',
        descricao: {
          pt: 'vape, narguile, seda, etc...'
        },
        especial: false
      },
      {
        icone: 'qr-code',
        texto: {
          pt: 'Sugestões'
        },
        value: 'sugestoes',
        descricao: {
          pt: 'poupar tempo'
        },
        especial: true
      }
    ]
  }

  public selecionarCategoria(categoria: any, index: number): void {
    this.categoriaSelecionada = categoria;
    this.indexAtual = index;
    this.obterIndexAtualDoSwiper();
    this.pularSlidePara(index);
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
  public irParaTopoDaTela(): void {
    this.conteudoQualAboa.scrollToTop(800);
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

  public definirRotaAnterior(): void {
    this.utilsService.definirRotaAnterior(this.rotaAtual)
  }
}
