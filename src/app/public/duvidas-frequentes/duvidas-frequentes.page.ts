import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';
import { Store } from '@ngrx/store';
@Component({
  selector: 'anf-duvidas-frequentes',
  templateUrl: './duvidas-frequentes.page.html',
  styleUrls: ['./duvidas-frequentes.page.scss'],
})
export class DuvidasFrequentesPage implements OnInit, OnDestroy {

  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  constructor(
    private modalCtrl : ModalController,
    private store : Store
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
  }

  /**
   * @description Fechar modal.
   */
  public fecharModal(): void {
    this.modalCtrl.dismiss();
  }

  /**
   * @description Obtém as informações guardadas no NGRX.
   */
  public obterTodasAsInformacoes(): void {
    this.informacoes$ = this.store.select(AppStore.obterTodasInformacoes);
    this.inscricaoInformacoes = this.informacoes$
    .subscribe((res: IAppState) => {
      this.informacoes = res;
    })
  }

  ngOnDestroy(): void {
    this.inscricaoInformacoes.unsubscribe();
  }

}
