import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonContent, NavController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import Swiper from 'swiper';

@Component({
  selector: 'anf-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild('conteudoInicio') conteudoInicio: IonContent;
  @ViewChild('sugestoesSwiper') sugestoesSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: any = 1;

  public sugestoes: any[];
  public totalDeSugestoes: number = 0;

  public heroEncolhido: boolean | undefined | void = false;

  public mostrarComponenteScrollDown: boolean = true;

  constructor(
    private title : Title,
    private utilsService : UtilsService,
    private navCtrl : NavController
  ) { }

  async ngOnInit() {
    this.obterSugestoes();
      this.definirLengthDeSugestoes();

    await this.toggleHero().then((res) => {
      this.heroEncolhido = res;
    })
  }

  ionViewWillEnter(): void {
    this.title.setTitle(`Qual a boa pra hoje em Santos | anfitrion`);
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
    @description Ir para tela: Pontos turísticos.
  */
  public irParaPontosTuristicos(): void {
    this.navCtrl.navigateForward(['pontos-turisticos', 'santos'])
  }

  /**
    @description Responsável por levar o usuário ao topo da tela.
  */
  public irParaTopoDaTela(): void {
    this.conteudoInicio.scrollToTop(800);
    this.mostrarComponenteScrollDown = true;
  }

  /**
    @description Ir para tela: Sobre nós
  */
  public irParaSobreNos(): void {
    this.navCtrl.navigateForward(['sobre-nos'])
  }
}
