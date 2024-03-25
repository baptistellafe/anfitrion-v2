import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { Idioma } from 'src/app/interfaces/Idioma';

@Component({
  selector: 'anf-language-button',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss'],
})
export class LanguageButtonComponent  implements OnInit {

  public selectedLanguage: Idioma;

  public languages: Idioma[] = [
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

  ngOnInit() {
    this.definirIdioma(this.languages[0]);
  }

  public definirIdioma(lang: Idioma): void {
    this.selectedLanguage = lang;
  }

}
