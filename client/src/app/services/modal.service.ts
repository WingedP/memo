import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService extends HttpService {
  constructor(
    public httpClient: HttpClient,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
  ) {
    super(httpClient);
  }


  public async callModalConfirmYesNo(props, modalClass) {
    const modal = await this.modalController.create({
      component: '',
      cssClass: modalClass,
      componentProps: props
    });

    await modal.present();
    return await modal.onWillDismiss();
  }

  public async onOpenActionsSheet(cssClass, buttons) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: cssClass,
      buttons: buttons,
    });
    await actionSheet.present();
    return await actionSheet.onDidDismiss();
  }
}
