import { ElementRef, Injectable } from '@angular/core';
import Swiper from 'swiper';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

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
}
