import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonInput, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { JA_ACESSOU_ANFITRION_KEY, PRIMEIRO_NOME_KEY } from 'src/app/consts/keys';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { definirPrimeiroAcesso, definirPrimeiroNome } from 'src/app/store/app/app.state';
import Swiper from 'swiper';

@Component({
  selector: 'anf-primeiro-acesso',
  templateUrl: './primeiro-acesso.page.html',
  styleUrls: ['./primeiro-acesso.page.scss'],
})
export class PrimeiroAcessoPage implements OnInit {

  @ViewChild('inputPrimeiroNome') inputPrimeiroNome: IonInput;
  public nomeDoVisitante: string = '';

  @ViewChild('primeiroAcessoSwiper') primeiroAcessoSwiper?: ElementRef<{ swiper: Swiper }>
  public indexAtual: number | undefined = 0;

  constructor(
    private title : Title,
    private utilsService : UtilsService,
    private navCtrl : NavController,
    private store : Store,
    private storageService : StorageService
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
    this.obterIndexAtualDoSwiper();
  }

  public transformarNome(nome: string): void {
    this.nomeDoVisitante = this.utilsService.transformarNome(nome);
  }

  public focarNoInputPrimeiroNome(): void {
    setTimeout(() => {
      this.inputPrimeiroNome.setFocus()
    }, 500);
  }

  public obterIndexAtualDoSwiper(): void {
    this.indexAtual = this.utilsService.obterIndexAtualDoSwiper(this.primeiroAcessoSwiper);

    this.definirComportamentoDeAcordoComSlide();
  }

  /**
   *
   */
  public definirComportamentoDeAcordoComSlide(): void {
    switch (this.indexAtual) {
      case 1:
        if (this.nomeDoVisitante) return;
        this.focarNoInputPrimeiroNome();
        break;

      default:
        break;
    }
  }

  public boasVindas(): void {

    let jaAcessouAnfitrion: boolean = true;
    this.storageService.armazenarChave(JA_ACESSOU_ANFITRION_KEY, jaAcessouAnfitrion);
    this.store.dispatch(definirPrimeiroAcesso({ jaAcessouAnfitrion }));

    let primeiroNome: string = this.nomeDoVisitante;
    this.storageService.armazenarChave(PRIMEIRO_NOME_KEY, primeiroNome);
    this.store.dispatch(definirPrimeiroNome({ primeiroNome }))

    this.navCtrl.navigateForward('/boas-vindas');
  }

}
