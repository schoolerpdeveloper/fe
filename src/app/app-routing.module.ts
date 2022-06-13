import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '@core/gaurds/is-authenticated.guard';
import { RouterEnum } from './enums/router.enum';

const routes: Routes = [
  {
    path: RouterEnum.AUTH,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
  },
  {
    path: RouterEnum.CONTAINER,
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
    canActivate:[IsAuthenticatedGuard]
  },
  { path: '', redirectTo: `/${RouterEnum.AUTH}`, pathMatch: 'full' }, // app->login
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false,useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
