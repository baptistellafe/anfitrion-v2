import { Injectable } from '@angular/core';
import { Cidade } from '../interfaces/Cidade';
import { Idioma } from '../interfaces/Idioma';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private cities: Cidade[] = [
    {
      text: 'Santos',
      name: 'Santos',
      value: 'santos',
      famousName: 'santos',
      isActiveOnAnfitrion: true,
      isComingSoon: false,
      naturalFrom: 'santista'
    },
    {
      text: 'São Vicente',
      name: 'São Vicente',
      value: 'saovicente',
      famousName: 'sv',
      isActiveOnAnfitrion: false,
      isComingSoon: false,
      naturalFrom: 'calunga'
    },
    {
      text: 'Guarujá',
      name: 'Guarujá',
      value: 'guaruja',
      famousName: 'guaru',
      isActiveOnAnfitrion: false,
      isComingSoon: false,
      naturalFrom: 'guarujaense'
    },
    {
      text: 'Praia Grande',
      name: 'Praia Grande',
      value: 'praiagrande',
      famousName: 'pg',
      isActiveOnAnfitrion: false,
      isComingSoon: false,
      naturalFrom: 'praia grandense'
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
}
