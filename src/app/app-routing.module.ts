import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./public/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'primeiro-acesso',
    loadChildren: () => import('./public/primeiro-acesso/primeiro-acesso.module').then( m => m.PrimeiroAcessoPageModule)
  },
  {
    path: 'boas-vindas',
    loadChildren: () => import('./public/boas-vindas/boas-vindas.module').then( m => m.BoasVindasPageModule)
  },
  {
    path: 'trocar-cidade',
    loadChildren: () => import('./public/trocar-cidade/trocar-cidade.module').then( m => m.TrocarCidadePageModule)
  },
  {
    path: 'duvidas-frequentes',
    loadChildren: () => import('./public/duvidas-frequentes/duvidas-frequentes.module').then( m => m.DuvidasFrequentesPageModule)
  },
  {
    path: 'pontos-turisticos',
    loadChildren: () => import('./private/pontos-turisticos/pontos-turisticos.module').then( m => m.PontosTuristicosPageModule)
  },
  {
    path: 'pontos-turisticos/:cidade',
    loadChildren: () => import('./private/pontos-turisticos/pontos-turisticos.module').then( m => m.PontosTuristicosPageModule)
  },
  {
    path: 'sobre-nos',
    loadChildren: () => import('./public/sobre-nos/sobre-nos.module').then( m => m.SobreNosPageModule)
  },
  {
    path: 'qual-a-boa',
    children: [
      {
        path: '',
        loadChildren: () => import('./private/qual-a-boa/qual-a-boa.module').then( m => m.QualABoaPageModule)
      },
      {
        path: ':categoria',
        loadChildren: () => import('./private/categoria/categoria.module').then( m => m.CategoriaPageModule)
      }
    ]
  },
  {
    path: 'sugestoes',
    loadChildren: () => import('./private/sugestoes/sugestoes.module').then( m => m.SugestoesPageModule)
  },
  {
    path: 'editar-dados',
    loadChildren: () => import('./private/editar-dados/editar-dados.module').then( m => m.EditarDadosPageModule)
  },
  {
    path: 'preferencias',
    loadChildren: () => import('./private/preferencias/preferencias.module').then( m => m.PreferenciasPageModule)
  },
  {
    path: 'trocar-idioma',
    loadChildren: () => import('./public/trocar-idioma/trocar-idioma.module').then( m => m.TrocarIdiomaPageModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./public/contato/contato.module').then( m => m.ContatoPageModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./public/nao-encontramos/nao-encontramos.module').then( m => m.NaoEncontramosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
