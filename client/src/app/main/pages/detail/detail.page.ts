import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AnimationBuilder, AnimationController, ModalController, NavController, ToastController } from '@ionic/angular';
import { PostsService } from 'src/app/services/posts.service';
import { PopupConfirmYesNoComponent } from 'src/app/shared/components/popup-confirm-yes-no/popup-confirm-yes-no.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public post: any;
  
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public modalController: ModalController,
    public animationCtrl: AnimationController,
    public actionSheetController: ActionSheetController,
    public navController: NavController,
    public toastController: ToastController,
    public postsService: PostsService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.post = this.router.getCurrentNavigation().extras.state.post;
      }
    });
  }

  public ngOnInit() {
    // empty
  }

  public async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          console.log('Delete clicked');
          this.confirmDeleteModal();
        }
      }, {
        text: 'Update',
        icon: 'create',
        data: 10,
        handler: () => {
          console.log('Update clicked');
          this.editMode();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  public async confirmDeleteModal() {

    const modal = await this.modalController.create({
      component: PopupConfirmYesNoComponent,
      cssClass: 'popup__confirmYesNo',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data === 'yes') {
      this.deletePost();
    }
  }

  public editMode() {
    const navigationExtras: any = {
      animated: false,
      state: {
        post: this.post,
      },
    };
    this.navController.navigateForward(['/main/edit'], navigationExtras)
  }

  public deletePost() {
    this.postsService.deletePost(this.post._id).subscribe((res) => {
      this.presentToast('delete success.', 'success');
      this.navController.navigateBack(['/main/home'])
    })
  }

  public async presentToast(msg, toastColor) {
    const toast = await this.toastController.create({
      color: toastColor,
      message: msg,
      duration: 1200,
    });
    toast.present();
  }
}
