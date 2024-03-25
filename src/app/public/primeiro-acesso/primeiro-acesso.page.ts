import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UtilsService } from 'src/app/services/utils.service';
import Swiper from 'swiper';

@Component({
  selector: 'anf-primeiro-acesso',
  templateUrl: './primeiro-acesso.page.html',
  styleUrls: ['./primeiro-acesso.page.scss'],
})
export class PrimeiroAcessoPage implements OnInit {

  @ViewChild('primeiroAcessoSwiper') primeiroAcessoSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: number | undefined = 0;

  public nomeDoVisitante: string = '';

  constructor(
    private title : Title,
    private utilsService : UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Primeiro acesso ao anfitrion')
  }

  public avancarSwiper(): void {
    this.utilsService.avancarSwiper(this.primeiroAcessoSwiper)
  }

  public retornarSwiper(): void {
    this.utilsService.retornarSwiper(this.primeiroAcessoSwiper)
  }

  public slideMudou(): void {
    this.indexAtual = this.utilsService.obterIndexAtualDoSwiper(this.primeiroAcessoSwiper);
  }

  public transformarNome(nome: string): void {
    this.nomeDoVisitante = this.utilsService.transformarNome(nome);
  }

}
