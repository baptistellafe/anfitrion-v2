import { ElementRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import Swiper from 'swiper';
import { definirSaudacao } from '../store/app/app.state';
import * as AppStore from './../../app/store/app/app.state';
import 'moment/locale/es';
import 'moment/locale/en-au';
import 'moment/locale/pt-br';
import { IonContent } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public store : Store
  ) {
    this.definirLocaleDoMomentJS('pt');
  }

  /**
   * @description Transforma a string (nome), removendo espaços em branco, números e deixa minusculo.
   * @param nome obrigatório do tipo string - Nome da pessoa.
   * @returns string transformada (minusculo, sem espaço em branco e sem números)
   */
  public transformarNome(nome: string): string {
    let novoNome = nome;
    novoNome = novoNome.replace(/[^\p{L}\s]/gu, "").replace(/\d/g, "").replace(/\s+/g, "").trim().toLocaleLowerCase();
    novoNome = novoNome.charAt(0).toUpperCase() + novoNome.slice(1);
    return novoNome;
  }

  public retornarSwiper(swiper?: ElementRef<{ swiper: Swiper }>): void {
    swiper?.nativeElement.swiper.slidePrev(500);
  }

  public avancarSwiper(swiper?: ElementRef<{ swiper: Swiper }>): void {
    swiper?.nativeElement.swiper.slideNext(500);
  }

  public obterIndexAtualDoSwiper(swiper?: ElementRef<{ swiper: Swiper }>): number | undefined {
    return swiper?.nativeElement.swiper.activeIndex;
  }

  public pularSlidePara(index: number, swiper?: ElementRef<{ swiper: Swiper }>): void | undefined {
    return swiper?.nativeElement.swiper.slideTo(index)
  }

  /**
   * @description Define a saudação que usaremos de acordo com a hora atual.
   */
  public definirSaudacaoDeAcordoComHorario(): void {
    let horaAtual: number = parseInt(moment().format('HH').split(':')[0]);
    let saudacao = {
      pt: '',
      en: '',
      es: ''
    };

    if (horaAtual >= 0 && horaAtual <= 5) {
      saudacao = {
        pt: 'A noite é uma criança',
        en: 'The night is a child',
        es: 'La notche é una criança'
      }
    } else if(horaAtual >= 6 && horaAtual <= 11) {
      saudacao = {
        pt: 'Bom dia',
        en: 'Good morning',
        es: 'Buenos dias'
      }
    } else if(horaAtual >= 12 && horaAtual <= 18) {
      saudacao = {
        pt: 'Boa tarde',
        en: 'Good afternoon',
        es: 'Buenas tardes'
      }
    } else {
      saudacao = {
        pt: 'Boa noite',
        en: 'Good night',
        es: 'Buenas notches'
      }
    }

    this.store.dispatch(definirSaudacao({ saudacao: saudacao }));
  }

  /**
   * @description Define o formato da informação que o momentJS irá apresentar. (pt, en, es).
   * @param idioma obrigatório do tipo string.
   */
  public definirLocaleDoMomentJS(idioma: string): void {
    moment.locale(idioma);
  }

  public definirRotaAnterior(rota: string | string[]): void {
    let props = { rotaAnterior: rota }
    this.store.dispatch(AppStore.definirRotaAnterior(props))
  }

  public scrollarConteudoParaTopo(conteudo: IonContent, velocidade: number): void {
    conteudo.scrollToTop(velocidade);
  }
}
