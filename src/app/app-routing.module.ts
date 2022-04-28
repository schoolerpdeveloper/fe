import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterEnum } from './enums/router.enum';

const routes: Routes = [
  {
    path: RouterEnum.AUTH,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
  },
  // {
  //   path: RouterEnum.CONTAINER,
  //   loadChildren: () =>
  //     import('./container/container.module').then((m) => m.ContainerModule),
  //   runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
  // },
  { path: '', redirectTo: RouterEnum.AUTH, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
