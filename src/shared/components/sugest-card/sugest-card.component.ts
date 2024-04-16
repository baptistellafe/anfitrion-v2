import { IAppState } from './../../../app/store/app/app.state';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Sugestao } from 'src/app/interfaces/Sugestao';
import * as AppStore from './../../../app/store/app/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'anf-sugest-card',
  templateUrl: './sugest-card.component.html',
  styleUrls: ['./sugest-card.component.scss'],
})
export class SugestCardComponent  implements OnInit, OnDestroy {

  @Input() sugestao: Sugestao;

  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  constructor(
    private store : Store
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
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

  ngOnDestroy() : void {
    this.inscricaoInformacoes.unsubscribe();
  }

}
