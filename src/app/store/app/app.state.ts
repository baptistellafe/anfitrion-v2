import { createAction, createReducer, on, props } from "@ngrx/store";
import { Cidade } from "src/app/interfaces/Cidade";
import { Idioma } from "src/app/interfaces/Idioma";

export interface IAppState {
  primeiroNome: string,
  idioma: Idioma,
  cidadeEscolhida: Cidade,
  jaAcessouAnfitrion: boolean
}

export const appInitialState: IAppState = {
  primeiroNome: '',
  idioma: {
    text: {
      pt: '',
      en: '',
      es: ''
    },
    value: ''
  },
  cidadeEscolhida: {
    text: '',
    name: '',
    value: '',
    famousName: '',
    isActiveOnAnfitrion: false,
    isComingSoon: false,
    naturalFrom: ''
  },
  jaAcessouAnfitrion: false
}

export const definirPrimeiroAcesso = createAction(
  '[APP] Definir primeiro acesso',
  props<{ jaAcessouAnfitrion: boolean }>()
)

export const definirPrimeiroNome = createAction(
  '[APP] Definir primeiro nome',
  props<{ primeiroNome: string }>()
)

export const definirIdioma = createAction(
  '[APP] Definir idioma',
  props<{ idioma: Idioma }>()
)

export const definirCidade = createAction(
  '[APP] Definir cidade',
  props<{ cidadeEscolhida: Cidade }>()
)

export const appReducer = createReducer(
  appInitialState,
  on(
    definirPrimeiroAcesso,
    (state, { jaAcessouAnfitrion }) => ({ ...state, jaAcessouAnfitrion: jaAcessouAnfitrion })
  ),
  on(
    definirIdioma,
    (state, { idioma }) => ({ ...state, idioma: idioma })
  ),
  on(
    definirCidade,
    (state, { cidadeEscolhida }) => ({ ...state, cidadeEscolhida: cidadeEscolhida })
  ),
  on(
    definirPrimeiroNome,
    (state, { primeiroNome }) => ({ ...state, primeiroNome: primeiroNome })
  )
)

