import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Cidade } from 'src/app/interfaces/Cidade';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'anf-pontos-turisticos',
  templateUrl: './pontos-turisticos.page.html',
  styleUrls: ['./pontos-turisticos.page.scss'],
})
export class PontosTuristicosPage implements OnInit {
  public cidadeIdentificadaNaUrl: string;
  public atendemosCidadeInformada: boolean;

  constructor(
    private route: ActivatedRoute,
    private appConfig : AppConfigService
    ) {
  }

  async ngOnInit() {
    this.obterParametroDaTela();
    await this.tratarParametroParaDarMatchComCidades(this.cidadeIdentificadaNaUrl);
    await this.identificarSeAtendeCidadeSolicitada(this.cidadeIdentificadaNaUrl);
  }

  public obterParametroDaTela(): void {
    this.route.paramMap
    .pipe(filter(param => param !== null && param !== undefined))
    .subscribe((param: any) => {
      this.cidadeIdentificadaNaUrl = param.get('cidade');
    })
  }

  public async tratarParametroParaDarMatchComCidades(nomeDaCidade: string): Promise<string> {
    let valorCapturadoNaUrl: string = nomeDaCidade.toLocaleLowerCase();
    return valorCapturadoNaUrl
  }

  public async identificarSeAtendeCidadeSolicitada(nomeDaCidadeEmFormatoDeValor: string) {
    let cidade: Cidade | undefined = await this.appConfig.identificarSeAtendeCidadeSolicitada(nomeDaCidadeEmFormatoDeValor);
    cidade?.value ? this.atendemosCidadeInformada = true : this.atendemosCidadeInformada = false
    console.log(this.atendemosCidadeInformada);

  }

}
