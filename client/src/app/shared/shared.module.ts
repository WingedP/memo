import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { NavComponent } from './components/nav/nav.component';
import { PopupConfirmYesNoComponent } from './components/popup-confirm-yes-no/popup-confirm-yes-no.component';
import { SkeletonListComponent } from './components/skeleton-list/skeleton-list.component';

const allSharedComponents = [
  NavComponent,
  ListComponent,
  SkeletonListComponent,
  PopupConfirmYesNoComponent,
];

@NgModule({
  declarations: [allSharedComponents],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    IonicModule,
  ],
  exports: [allSharedComponents],
})
export class SharedModule {
}
