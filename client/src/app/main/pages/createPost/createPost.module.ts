import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePostPageRoutingModule } from './createPost-routing.module';

import { CreatePostPage } from './createPost.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    CreatePostPageRoutingModule
  ],
  declarations: [CreatePostPage]
})
export class CreatePostPageModule {}
