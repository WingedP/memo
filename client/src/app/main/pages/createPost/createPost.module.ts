import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePostPageRoutingModule } from './createPost-routing.module';

import { CreatePostPage } from './createPost.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostFormComponent } from './components/post-form/post-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreatePostPageRoutingModule
  ],
  declarations: [CreatePostPage, PostFormComponent]
})
export class CreatePostPageModule { }
