import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';

@Component({
  selector: 'anf-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {

  public tipoDeContato: 'comercial' | 'outros';

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState = AppStore.appInitialState;

  constructor(
    private store : Store
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
    this.definirTipoDeContatoInicial('comercial');
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

  public definirTipoDeContatoInicial(tipo: 'comercial' | 'outros'): void {
    this.tipoDeContato = tipo;
  }

}
