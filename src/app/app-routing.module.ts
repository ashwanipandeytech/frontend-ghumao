import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),

  },

  {
    path: 'category',
    pathMatch: 'full',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),

  },
  {
    path: 'category/:slug',
    pathMatch: 'full',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),

  },

  {
    path: 'package',
    pathMatch: 'full',
    loadChildren: () => import('./packages/packages.module').then(m => m.PackagesModule),

  },
  {
    path: 'package/:slug',
    pathMatch: 'full',
    loadChildren: () => import('./packages/packages.module').then(m => m.PackagesModule),

  },

  {
    path: 'aboutus',
    pathMatch: 'full',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),

  },




  {
    path: 'login',
    component: LoginComponent
},




];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false,onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
