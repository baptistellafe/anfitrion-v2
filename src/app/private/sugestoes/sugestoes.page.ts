import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonContent, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { IAppState } from 'src/app/store/app/app.state';
import Swiper from 'swiper';
import * as AppStore from './../../store/app/app.state';


@Component({
  selector: 'anf-sugestoes',
  templateUrl: './sugestoes.page.html',
  styleUrls: ['./sugestoes.page.scss'],
})
export class SugestoesPage implements OnInit {

  @ViewChild('conteudoSugestoes') conteudoSugestoes: IonContent;
  @ViewChild('sugestoesSwiper') sugestoesSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: any = 1;

  public sugestoes: any[];
  public totalDeSugestoes: number = 0;

  public heroEncolhido: boolean | undefined | void = false;

  public mostrarComponenteScrollDown: boolean = true;

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState;

  constructor(
    private title : Title,
    private utilsService : UtilsService,
    private navCtrl : NavController,
    private store : Store
  ) { }

  async ngOnInit() {
    this.obterTodasAsInformacoes();

    this.obterSugestoes();
    this.definirLengthDeSugestoes();

    await this.toggleHero().then((res) => {
      this.heroEncolhido = res;
    })
  }

  ionViewDidEnter(): void {
    this.title.setTitle(`Permita-me te sugerir algumas coisas ${this.informacoes.cidadeEscolhida.location[this.informacoes.idioma.value]}`);
  }

  public obterSugestoes(): void {

    this.sugestoes = [
      {
        label: {
          pt: 'festival de',
          en: 'festival of',
          es: 'festivito del'
        },
        texto: {
          pt: 'comida japonesa',
          en: 'japonese food',
          es: 'comidita japonesa'
        },
        layoutInvertido: false,
        categoria: {
          pt: 'comer',
          en: 'eat',
          es: 'cume'
        },
        value: 'festival-de-comida-japonesa',
        cities: ['santos']
      },
      {
        label: {
          pt: 'o que tem na',
          en: 'places on the',
          es: 'lugar en la'
        },
        texto: {
          pt: 'rua gastronômica',
          en: 'gastronomic street',
          es: 'rua gastronomi'
        },
        layoutInvertido: false,
        categoria: {
          pt: 'conhecer',
          en: 'know',
          es: 'cuniecer'
        },
        value: 'festival-de-comida-japonesa',
        cities: ['santos']
      },
      {
        label: {
          pt: 'pontos',
          en: 'points',
          es: 'pontes'
        },
        texto: {
          pt: 'turísticos',
          en: 'touristics',
          es: 'turistes'
        },
        layoutInvertido: false,
        categoria: {
          pt: 'turistas',
          en: 'tourists',
          es: 'turismts'
        },
        value: 'pontos-turisticos',
        cities: ['santos']
      },
      {
        label: {
          pt: 'lugares para',
          en: 'places to',
          es: 'logaries'
        },
        texto: {
          pt: 'tatuar',
          en: 'make tattoo',
          es: 'tatuazitas'
        },
        layoutInvertido: false,
        categoria: {
          pt: 'estética',
          en: 'estics',
          es: 'turestismts'
        },
        value: 'pontos-turisticos',
        cities: ['santos']
      }
    ]
  }

  public async toggleHero(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 4000);
    });
  }

  /**
    @description Define o total de sugestões para colocar no step.
  */
  public definirLengthDeSugestoes(): void {
    this.totalDeSugestoes = this.sugestoes.length;
  }

  /**
    @description Disparado quando houver mudança no swiper.
  */
  public slideMudou(): void {
    this.obterIndexAtualDoSwiper();
  }

  /**
    @description Obtém o index ativo do swiper.
  */
  public obterIndexAtualDoSwiper(): void {
    this.indexAtual = this.utilsService.obterIndexAtualDoSwiper(this.sugestoesSwiper);
    this.indexAtual = this.indexAtual + 1;
  }

  public trocarCidade(): void {
    this.navCtrl.navigateForward('/trocar-cidade');
  }

  /**
    @description Função responsável por esconder o componente de scroll quando começar a rolar a tela para baixo.
  */
  public esconderComponenteScroll(e: any): void {

    if (e.detail.scrollTop > 60) {
      this.mostrarComponenteScrollDown = false;
    } else {
      this.mostrarComponenteScrollDown = true;
    }
  }

  /**
    @description Ir para tela: Pontos turísticos BARRA cidade.
  */
  public irParaPontosTuristicos(): void {
    this.navCtrl.navigateForward(['pontos-turisticos', this.informacoes.cidadeEscolhida.value])
  }

  /**
    @description Responsável por levar o usuário ao topo da tela.
  */
  public irParaTopoDaTela(): void {
    this.conteudoSugestoes.scrollToTop(800);
    this.mostrarComponenteScrollDown = true;
  }

  /**
    @description Ir para tela: Sobre nós
  */
  public irParaSobreNos(): void {
    this.navCtrl.navigateForward(['sobre-nos'])
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
