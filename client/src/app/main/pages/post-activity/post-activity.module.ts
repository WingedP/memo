import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostActivityPageRoutingModule } from './post-activity-routing.module';

import { PostActivityPage } from './post-activity.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostFormComponent } from './components/post-form/post-form.component';

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostActivityPageRoutingModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'ashonthecloud', upload_preset: 'myahdhc6' } as CloudinaryConfiguration),
  ],
  declarations: [PostActivityPage, PostFormComponent]
})
export class PostActivityPageModule { }
