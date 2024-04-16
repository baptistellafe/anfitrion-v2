import { Observable, Subscription } from 'rxjs';
import { IAppState } from './../../../app/store/app/app.state';
import { Component, Input, OnInit } from '@angular/core';
import { RedeSocial } from 'src/app/interfaces/RedeSocial';
import { AppConfigService } from 'src/app/services/app-config.service';
import { UtilsService } from 'src/app/services/utils.service';
import * as AppStore from './../../../app/store/app/app.state';
import { Store } from '@ngrx/store';


@Component({
  selector: 'anf-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  public redesSociais: RedeSocial[];

  @Input() darkMode: boolean = false;

  public informacoes: IAppState = AppStore.appInitialState;
  public informacoes$: Observable<IAppState>;
  public inscricaoInformacoes: Subscription;

  constructor(
    private appConfig : AppConfigService,
    private store : Store
  ) { }

  ngOnInit() {
    this.obterTodasAsInformacoes();
    this.redesSociais = this.appConfig.obterRedesSociais()
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



}
