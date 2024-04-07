import { Component, OnInit } from '@angular/core';
import { AlertOptions } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CIDADE_ESCOLHIDA_KEY, IDIOMA_KEY } from 'src/app/consts/keys';
import { Cidade } from 'src/app/interfaces/Cidade';
import { AppConfigService } from 'src/app/services/app-config.service';
import { StorageService } from 'src/app/services/storage.service';
import { IAppState, definirCidade, definirIdioma } from 'src/app/store/app/app.state';
import * as AppStore from './../../../app/store/app/app.state';


@Component({
  selector: 'anf-city-button',
  templateUrl: './city-button.component.html',
  styleUrls: ['./city-button.component.scss'],
})
export class CityButtonComponent  implements OnInit {

  public cities: Cidade[];
  public cidadeEscolhida: Cidade;
  public selectedCityValue: string;

  public informacoes$: Observable<IAppState>;
  public informacoes: IAppState;

  public cityButtonAlertOptions: AlertOptions = {
    subHeader: 'Uma cidade',
    message: 'Escolha uma da lista',
    backdropDismiss: false
  }

  constructor(
    private appConfig : AppConfigService,
    private store : Store,
    private storageService : StorageService
  ) { }

  async ngOnInit() {
    this.cities = this.appConfig.obterCidades();
    this.obterTodasAsInformacoes();
    this.definirCidadeInicial();
  }

  public definirCidadeInicial(): void {

    if (this.informacoes.cidadeEscolhida.value) {
      this.cidadeEscolhida = this.informacoes.cidadeEscolhida;
    } else {
      this.cidadeEscolhida = this.cities[0];
    }

    let cidadeEscolhida = this.cidadeEscolhida;
    this.storageService.armazenarChave(CIDADE_ESCOLHIDA_KEY, this.cidadeEscolhida);
    this.store.dispatch(definirCidade({ cidadeEscolhida }));
  }

  public definirCidade(e?: any): void {
    let cidadeEscolhida: Cidade;
    cidadeEscolhida = this.cidadeEscolhida;

    this.storageService.armazenarChave(CIDADE_ESCOLHIDA_KEY, cidadeEscolhida);
    this.store.dispatch(definirCidade({ cidadeEscolhida }));
  }

  public compararCidades(city1: Cidade, city2: Cidade): boolean {
    return city1 && city2 ? city1.value === city2.value : city1 === city2;
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
