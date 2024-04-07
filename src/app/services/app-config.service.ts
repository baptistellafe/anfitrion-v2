import { Injectable } from '@angular/core';
import { Cidade } from '../interfaces/Cidade';
import { Idioma } from '../interfaces/Idioma';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private opcoesDoMenu: any[] = [
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
    },
    {
      titulo: {
        pt: 'Preferências'
      },
      descricao: {
        pt: 'Configuração do app'
      },
      rota: 'preferencias',
      icone: 'settings'
    }
  ]

  private cities: Cidade[] = [
    {
      text: 'Santos',
      name: 'Santos',
      value: 'santos',
      famousName: 'santos',
      isActiveOnAnfitrion: true,
      isComingSoon: false,
      naturalFrom: 'santista',
      origin: {
        pt: 'de Santos',
        en: 'from Santos',
        es: 'del Santos'
      },
      location: {
        pt: 'em Santos',
        en: 'in Santos',
        es: 'en Santos'
      }
    },
    {
      text: 'São Vicente',
      name: 'São Vicente',
      value: 'saovicente',
      famousName: 'sv',
      isActiveOnAnfitrion: false,
      isComingSoon: false,
      naturalFrom: 'calunga',
      origin: {
        pt: 'de São Vicente',
        en: 'from São Vicente',
        es: 'del Santos'
      },
      location: {
        pt: 'em São Vicente',
        en: 'at São Vicente',
        es: 'en São Vicente'
      }
    },
    {
      text: 'Guarujá',
      name: 'Guarujá',
      value: 'guaruja',
      famousName: 'guaru',
      isActiveOnAnfitrion: false,
      isComingSoon: false,
      naturalFrom: 'guarujaense',
      origin: {
        pt: 'do Guarujá',
        en: 'from Guarujá',
        es: 'del Guarujá'
      },
      location: {
        pt: 'no Guarujá',
        en: 'on Guarujá',
        es: 'en Guarujá'
      }
    },
    {
      text: 'Praia Grande',
      name: 'Praia Grande',
      value: 'praiagrande',
      famousName: 'pg',
      isActiveOnAnfitrion: false,
      isComingSoon: false,
      naturalFrom: 'praia grandense',
      origin: {
        pt: 'de Praia Grande',
        en: 'from Praia Grande',
        es: 'del Praia Grande'
      },
      location: {
        pt: 'na Praia Grande',
        en: 'in Praia Grande',
        es: 'en Praia Grande'
      }
    },
  ]

  private idiomas: Idioma[] = [
    {
      text: {
        pt: 'Português',
        en: 'Portuguese',
        es: 'Portuguesito'
      },
      value: 'pt'
    },
    {
      text: {
        pt: 'Inglês',
        en: 'English',
        es: 'Englixito'
      },
      value: 'en'
    },
    {
      text: {
        pt: 'Espanhol',
        en: 'Spanish',
        es: 'Spaniol'
      },
      value: 'es'
    }
  ]

  constructor() { }

  public obterCidades(): Cidade[] {
    return this.cities
  }

  public obterIdiomas(): Idioma[] {
    return this.idiomas
  }

  public async identificarSeAtendeCidadeSolicitada(nomeDaCidadeEmFormatoDeValor: string): Promise<Cidade | undefined> {
    let cidade: Cidade | undefined = this.cities.find((cidade: Cidade) => {
      return cidade.value === nomeDaCidadeEmFormatoDeValor
    })

    console.log(cidade);

    return cidade

  }

  public obterOpcoesDoMenu(): Idioma[] {
    return this.opcoesDoMenu
  }
}
