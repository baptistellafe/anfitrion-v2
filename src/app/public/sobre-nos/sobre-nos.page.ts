import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import Swiper from 'swiper';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'anf-sobre-nos',
  templateUrl: './sobre-nos.page.html',
  styleUrls: ['./sobre-nos.page.scss'],
})
export class SobreNosPage implements OnInit {

  @ViewChild('sobreNosSwiper') sobreNosSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: any = 0;

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState = AppStore.appInitialState;

  constructor(
    private title : Title,
    private store : Store,
    private utilsService : UtilsService
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
  }

  ionViewDidEnter(): void {
    this.title.setTitle(`Sobre o anfitrion`);
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

  /**
  @description Obtém o index ativo do swiper.
  */
  public obterIndexAtualDoSwiper() {
    this.indexAtual = this.utilsService.obterIndexAtualDoSwiper(this.sobreNosSwiper);
    console.log(this.indexAtual);

  }

  public slideSobreNosMudou(): void {
    this.obterIndexAtualDoSwiper();
  }

}
