import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'anf-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public itemSelecionado: any;

  public menu: any[] = [
    {
      titulo: {
        pt: 'Qual a boa'
      },
      descricao: {
        pt: 'Conheça a cidade'
      },
      rota: 'qual-a-boa',
      icone: 'bulb'
    },
    {
      titulo: {
        pt: 'Sugestões'
      },
      descricao: {
        pt: 'Poupe seu tempo'
      },
      rota: 'sugestoes',
      icone: 'qr-code'
    },
    {
      titulo: {
        pt: 'Sobre'
      },
      descricao: {
        pt: 'Conheça o anfitrion'
      },
      rota: 'sobre-nos',
      icone: 'terminal'
    }
  ]

  constructor(

  ) {}

  ngOnInit() {

  }

  public definirItem(itemDoMeu: any): void {
    this.itemSelecionado = itemDoMeu;
  }
}
