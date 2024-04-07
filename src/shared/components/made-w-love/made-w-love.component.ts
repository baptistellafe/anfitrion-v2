import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store/app/app.state';
import * as AppStore from './../../../app/store/app/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'anf-made-w-love',
  templateUrl: './made-w-love.component.html',
  styleUrls: ['./made-w-love.component.scss'],
})
export class MadeWLoveComponent  implements OnInit {
  @Input() posicionamento: string;
  @Input() centralizarNoMobile: boolean;

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState;

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
    this.informacoes$.subscribe((res: IAppState) => {
      this.informacoes = res;
    })
  }

}
