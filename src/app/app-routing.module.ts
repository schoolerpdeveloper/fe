import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  },
  { path: '', redirectTo: `/${RouterEnum.AUTH}`, pathMatch: 'full' }, // app->pages
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
