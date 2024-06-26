import { Injectable } from '@angular/core';
import { Cidade } from '../interfaces/Cidade';
import { Idioma } from '../interfaces/Idioma';
import { RedeSocial } from '../interfaces/RedeSocial';
import { Sugestao } from '../interfaces/Sugestao';
import { Categoria } from '../interfaces/Categoria';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private categorias: Categoria[] = [
    {
      icone: 'beer',
      texto: {
        pt: 'Bares',
        en: 'Bars',
        es: 'Barito'
      },
      value: 'bares',
      descricao: {
        pt: 'bares, botecos e pubs.',
        en: 'bar and pubs.',
        es: 'barizots, boteqitops e pb.'
      },
      especial: false,
      cities: ['santos'],
      ativo: true
    },
    {
      icone: 'restaurant',
      texto: {
        pt: 'Restaurantes',
        en: 'Restaurants',
        es: 'Restaurantito'
      },
      value: 'restaurantes',
      descricao: {
        pt: 'comida japonesa, mexicana, etc...',
        en: 'japan food, mexican food, etc...',
        es: 'japonesito, mexicanito, etc...'
      },
      especial: false,
      cities: ['santos'],
      ativo: true
    },
    {
      icone: 'fast-food',
      texto: {
        pt: 'Hamburguerias',
        en: 'Burguer place',
        es: 'Hamburguerita'
      },
      value: 'hamburguerias',
      descricao: {
        pt: 'hamburguer, fast-food...',
        en: 'hamburguer, fast-food...',
        es: 'hamburguer, comidita rapidita, etc...'
      },
      especial: false,
      cities: ['santos'],
      ativo: true
    },
    {
      icone: 'pizza',
      texto: {
        pt: 'Pizzarias e esfiharias',
        en: 'Pizza and esfihas',
        es: 'Pizzitas e esfihitas'
      },
      value: 'pizzarias-e-esfihas',
      descricao: {
        pt: 'pizzas, esfihas, brotos, etc...',
        en: 'pizzas, esfihas, etc...',
        es: 'pizzitas, esfihitas, etc...'
      },
      especial: false,
      cities: ['santos'],
      ativo: true
    },
    {
      icone: 'musical-notes',
      texto: {
        pt: 'Casas noturnas',
        en: 'Nightclubs',
        es: 'Casas nocturnas'
      },
      value: 'casasnoturnas',
      descricao: {
        pt: 'música ao vivo, dj, etc...',
        en: 'live music, dj, etc...',
        es: 'musiquita ao vivo, djzito, etc...'
      },
      especial: false,
      cities: ['santos'],
      ativo: true
    },
    {
      icone: 'wine',
      texto: {
        pt: 'Adegas',
        en: 'Wine Houses',
        es: 'Casa de bebidas'
      },
      value: 'adegas',
      descricao: {
        pt: 'combo de bebida, gelo, etc...',
        en: 'drink comb, ice, etc...',
        es: 'combito de bebida, gelito, etc...'
      },
      especial: false,
      cities: ['santos'],
      ativo: false
    },
    {
      icone: 'flame',
      texto: {
        pt: 'Tabacarias',
        en: 'Smoke House',
        es: 'Tabacarita'
      },
      value: 'tabacarias',
      descricao: {
        pt: 'vape, narguile, seda, etc...',
        en: 'vaps, narguils, seds...',
        es: 'vapito, narguilito, sedita, etc...'
      },
      especial: false,
      cities: ['santos'],
      ativo: true
    },
    {
      icone: 'cafe',
      texto: {
        pt: 'Cafeterias',
        en: 'Coffes',
        es: 'Cafezito'
      },
      value: 'cafeterias',
      descricao: {
        pt: 'café expresso, capuccino, etc...',
        en: 'cafs, cafezesd, csdos...',
        es: 'cafezito, cafzfeto, seditcasda, etc...'
      },
      especial: false,
      cities: ['santos'],
      ativo: true
    },
    {
      icone: 'qr-code',
      texto: {
        pt: 'Sugestões',
        en: 'Sugesttions',
        es: 'Suggests'
      },
      value: 'sugestoes',
      descricao: {
        pt: 'poupar tempo',
        en: 'save your time',
        es: 'salve tu tiempo'
      },
      especial: true,
      cities: ['santos'],
      ativo: true
    }
  ]

  private sugestoes: Sugestao[] = [
    {
      label: {
        pt: 'festival de',
        en: 'festival of',
        es: 'festivito del'
      },
      texto: {
        pt: 'comida japonesa',
        en: 'japonese food',
        es: 'comidita japonesa'
      },
      layoutInvertido: false,
      categoria: {
        pt: 'comer',
        en: 'eat',
        es: 'cume'
      },
      value: 'festival-de-comida-japonesa',
      cities: ['santos'],
      ativo: true
    },
    {
      label: {
        pt: 'o que tem na',
        en: 'places on the',
        es: 'lugar en la'
      },
      texto: {
        pt: 'rua gastronômica',
        en: 'gastronomic street',
        es: 'rua gastronomi'
      },
      layoutInvertido: false,
      categoria: {
        pt: 'conhecer',
        en: 'know',
        es: 'cuniecer'
      },
      value: 'festival-de-comida-japonesa',
      cities: ['santos'],
      ativo: true
    },
    {
      label: {
        pt: 'pontos',
        en: 'points',
        es: 'pontes'
      },
      texto: {
        pt: 'turísticos',
        en: 'touristics',
        es: 'turistes'
      },
      layoutInvertido: false,
      categoria: {
        pt: 'turistas',
        en: 'tourists',
        es: 'turismts'
      },
      value: 'pontos-turisticos',
      cities: ['santos'],
      ativo: true
    },
    {
      label: {
        pt: 'lugares para',
        en: 'places to',
        es: 'logaries'
      },
      texto: {
        pt: 'tatuar',
        en: 'make tattoo',
        es: 'tatuazitas'
      },
      layoutInvertido: false,
      categoria: {
        pt: 'estética',
        en: 'estics',
        es: 'turestismts'
      },
      value: 'pontos-turisticos',
      cities: ['santos','saovicente'],
      ativo: true
    }
  ]

  private opcoesDoMenu: any[] = [
    {
      titulo: {
        pt: 'Qual a boa?',
        en: `What's up?`,
        es: 'Quala boa',
      },
      descricao: {
        pt: 'conheça a cidade',
        en: 'know the city',
        es: 'conocer la ciudad'
      },
      rota: 'qual-a-boa',
      icone: 'bulb',

    },
    {
      titulo: {
        pt: 'Sugestões',
        en: `Suggestions`,
        es: 'Sugerencias',
      },
      descricao: {
        pt: 'poupe seu tempo',
        en: 'save your time',
        es: 'ahorra tu tiempo'
      },
      rota: 'sugestoes',
      icone: 'qr-code'
    },
    {
      titulo: {
        pt: 'Sobre',
        en: 'About',
        es: 'Acerca de'
      },
      descricao: {
        pt: 'Conheça o anfitrion',
        en: 'What we do',
        es: 'O que hacemos'
      },
      rota: 'sobre-nos',
      icone: 'terminal'
    },
    {
      titulo: {
        pt: 'Preferências',
        en: 'Preferences',
        es: 'Preferiencias'
      },
      descricao: {
        pt: 'Configuração do app',
        en: 'App configuration',
        es: 'Configuracion del app'
      },
      rota: 'preferencias',
      icone: 'settings'
    },
    {
      titulo: {
        pt: 'Contato',
        en: 'Contact',
        es: 'Contatito'
      },
      descricao: {
        pt: 'Fale comigo',
        en: 'Contact me',
        es: 'Habla comigo'
      },
      rota: 'contato',
      icone: 'chatbubble-ellipses'
    }
  ]

  private cidades: Cidade[] = [
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
      },
      descricao: {
        pt: ["Santos é uma cidade fenomenal, a principal cidade da Baixada.", "Blablaboablabal."],
        en: ["Santos is the best citt.", "Thanks for daldaoda."],
        es: ["Santos és la ciudad mas dada.", "ticaracitaca."]
      }
    },
    {
      text: 'São Vicente',
      name: 'São Vicente',
      value: 'saovicente',
      famousName: 'sv',
      isActiveOnAnfitrion: true,
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
      },
      descricao: {
        pt: ["Sao Vicente é uma cidade fenomenal, a principal cidade da Baixada.", "Blablaboablabal."],
        en: ["Sao Vicente is the best citt.", "Thanks for daldaoda."],
        es: ["Sao Vicente és la ciudad mas dada.", "ticaracitaca."]
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
      },
      descricao: {
        pt: ["Guarujá é uma cidade fenomenal, a principal cidade da Baixada.", "Blablaboablabal."],
        en: ["Guarujá is the best citt.", "Thanks for daldaoda."],
        es: ["Guarujá és la ciudad mas dada.", "ticaracitaca."]
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
      },
      descricao: {
        pt: ["Praia Grande é uma cidade fenomenal, a principal cidade da Baixada.", "Blablaboablabal."],
        en: ["Praia Grande is the best citt.", "Thanks for daldaoda."],
        es: ["Praia Grande és la ciudad mas dada.", "ticaracitaca."]
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

  private redesSociais: RedeSocial[] = [
    {
      nome: {
        pt: 'Instagram',
        en: 'Instagram',
        es: 'Instagram'
      },
      estaAtivo: true,
      url: 'https://www.instagram.com/anfitrionapp/',
      label: 'instagram',
      usuario: 'anfitrionapp'
    },
    {
      nome: {
        pt: 'Instagram',
        en: 'Instagram',
        es: 'Instagram'
      },
      estaAtivo: true,
      url: 'https://www.instagram.com/anfitrionapp/',
      label: 'tiktok',
      usuario: 'anfitrionapp'
    }
  ]

  constructor() { }

  public obterCidades(): Cidade[] {
    return this.cidades
  }

  public obterIdiomas(): Idioma[] {
    return this.idiomas
  }

  public obterSugestoes(cidade: string): Sugestao[] {
    console.log(cidade);

    let sugestoes = this.sugestoes.filter((sugestao: Sugestao) => {
      return sugestao.cities.includes(cidade) && sugestao.ativo
    })

    return sugestoes
  }

  public obterCategorias(cidade: string): Categoria[] {
    let categorias = this.categorias.filter((categoria: Categoria) => {
      return categoria.cities.includes(cidade) && categoria.ativo
    })

    return categorias
  }

  public async identificarSeAtendeCidadeSolicitada(nomeDaCidadeEmFormatoDeValor: string): Promise<Cidade | undefined> {
    let cidade: Cidade | undefined = this.cidades.find((cidade: Cidade) => {
      return cidade.value === nomeDaCidadeEmFormatoDeValor
    })

    return cidade
  }

  public obterOpcoesDoMenu(): Idioma[] {
    return this.opcoesDoMenu
  }

  public obterRedesSociais(): RedeSocial[] {
    return this.redesSociais
  }
}
