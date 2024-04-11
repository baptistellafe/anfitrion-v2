import { createAction, createReducer, createSelector, on, props, createFeatureSelector } from "@ngrx/store";
import { Anfitrion } from "src/app/interfaces/Anfitrion";
import { Cidade } from "src/app/interfaces/Cidade";
import { Idioma } from "src/app/interfaces/Idioma";

export interface IAppState {
  primeiroNome: string,
  idioma: Idioma,
  cidadeEscolhida: Cidade,
  jaAcessouAnfitrion: boolean,
  saudacao: string,
  anfitrion: Anfitrion,
  rotaAnterior: string | string[]
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
    naturalFrom: '',
    origin: {
      pt: '',
      en: '',
      es: ''
    },
    location: {
      pt: '',
      en: '',
      es: ''
    }
  },
  jaAcessouAnfitrion: false,
  saudacao: '',
  anfitrion: {
    whatsApp: '5513997330408',
    instagram: 'anfitrionapp'
  },
  rotaAnterior: ''
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

export const definirSaudacao = createAction(
  '[APP] Definir saudação',
  props<{ saudacao: string }>()
)

export const definirRotaAnterior = createAction(
  '[APP] Definir rota anterior',
  props<{ rotaAnterior: string | string[] }>()
)

export const definirPreferencias = createAction(
  '[APP] Definir preferências (Cidade e Idioma)',
  props<{ preferencias: { idioma: Idioma, cidadeEscolhida: Cidade }  }>()
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
  ),
  on(
    definirSaudacao,
    (state, { saudacao }) => ({ ...state, saudacao: saudacao })
  ),
  on(
    definirRotaAnterior,
    (state, { rotaAnterior }) => ({ ...state, rotaAnterior: rotaAnterior })
  ),
  on(
    definirPreferencias,
    (state, { preferencias }) => ({
      ...state,
      idioma: preferencias.idioma,
      cidadeEscolhida: preferencias.cidadeEscolhida
    })
  ),
)

// SELETORES
export const appState = createFeatureSelector<IAppState>('app');

export const obterTodasInformacoes = createSelector(
  appState,
  (state: IAppState) => state
);
