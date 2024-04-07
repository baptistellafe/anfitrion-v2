import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../store/app/app.state';

@Component({
  selector: 'anf-editar-dados',
  templateUrl: './editar-dados.page.html',
  styleUrls: ['./editar-dados.page.scss'],
})
export class EditarDadosPage implements OnInit {

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState;

  constructor(
    private title : Title,
    private store : Store
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
  }

  ionViewDidEnter(): void {
    this.title.setTitle(`Altere suas informações`);
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

}
