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
        value: 'bares'
      },
      {
        icone: 'restaurant',
        texto: {
          pt: 'Restaurantes'
        },
        value: 'restaurantes'
      },
      {
        icone: 'musical-notes',
        texto: {
          pt: 'Casas noturnas'
        },
        value: 'casas-noturnas'
      },
      {
        icone: 'wine',
        texto: {
          pt: 'Adegas'
        },
        value: 'adegas'
      },
      {
        icone: 'flame',
        texto: {
          pt: 'Tabacarias'
        },
        value: 'tabacarias'
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
    this.utilsService.pularSlidePara(index, this.qualaboaSwiper)
  }
}
