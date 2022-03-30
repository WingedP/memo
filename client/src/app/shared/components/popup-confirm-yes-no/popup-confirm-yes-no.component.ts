import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popup-confirm-yes-no',
  templateUrl: './popup-confirm-yes-no.component.html',
  styleUrls: ['./popup-confirm-yes-no.component.scss'],
})
export class PopupConfirmYesNoComponent implements OnInit {

  public denied: string;

  constructor(
    public modalCtrl: ModalController,
  ) { }

  public ngOnInit() {
  }

  public onYes() {
    this.modalCtrl.dismiss('yes');
  }

  public onNo() {
    this.modalCtrl.dismiss('no');
  }

}
