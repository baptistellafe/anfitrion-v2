import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { UtilsService } from 'src/app/services/utils.service';
import Swiper from 'swiper';

@Component({
  selector: 'anf-qual-a-boa',
  templateUrl: './qual-a-boa.page.html',
  styleUrls: ['./qual-a-boa.page.scss'],
})
export class QualABoaPage implements OnInit {

  public categoriaSelecionada: any;

  @ViewChild('qualaboaSwiper') qualaboaSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: any = 0;

  @ViewChild('qualaboaDescricaoSwiper') qualaboaDescricaoSwiper?: ElementRef<{ swiper: Swiper }>

  public horaAtual : number = moment().hour();
  public categorias: any[];

  constructor(
    private navCtrl : NavController,
    private title : Title,
    private utilsService : UtilsService
    ) { }

  ngOnInit() {
    this.title.setTitle(`Qual a boa pra hoje em Santos | anfitrion`);
    console.log(this.horaAtual);
    this.obterCategorias();
    this.selecionarCategoria(this.categorias[0], this.indexAtual)
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
        }
      },
      {
        icone: 'restaurant',
        texto: {
          pt: 'Restaurantes'
        },
        value: 'restaurantes',
        descricao: {
          pt: 'comida japonesa, mexicana, etc...'
        }
      },
      {
        icone: 'musical-notes',
        texto: {
          pt: 'Casas noturnas'
        },
        value: 'casasnoturnas',
        descricao: {
          pt: 'música ao vivo, etc...'
        }
      },
      {
        icone: 'wine',
        texto: {
          pt: 'Adegas'
        },
        value: 'adegas',
        descricao: {
          pt: 'combo de bebida, gelo, etc...'
        }
      },
      {
        icone: 'flame',
        texto: {
          pt: 'Tabacarias'
        },
        value: 'tabacarias',
        descricao: {
          pt: 'vape, narguile, seda, etc...'
        }
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
    this.navCtrl.navigateForward(['qual-a-boa', categoria.value])
  }
}
