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
    path: 'inicio',
    loadChildren: () => import('./private/inicio/inicio.module').then( m => m.InicioPageModule)
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
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./public/nao-encontramos/nao-encontramos.module').then( m => m.NaoEncontramosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
