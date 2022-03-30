import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePostPage } from './createPost.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePostPageRoutingModule {}
