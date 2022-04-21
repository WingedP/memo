import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/post-activity/post-activity.module').then(m => m.PostActivityPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/post-activity/post-activity.module').then(m => m.PostActivityPageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./pages/detail/detail.module').then(m => m.DetailPageModule)
  },
  {
    path: 'post-activity',
    loadChildren: () => import('./pages/post-activity/post-activity.module').then(m => m.PostActivityPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
