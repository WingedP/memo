import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AnimationController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/datatypes/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { PopupConfirmYesNoComponent } from 'src/app/shared/components/popup-confirm-yes-no/popup-confirm-yes-no.component';
import { DeletePost, GetPostDetail } from '../../states/postsStates/posts.actions';
import { PostsState } from '../../states/postsStates/posts.state';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPage {
  @Select(PostsState.getPostDetail)
  post$: Observable<Post>;

  constructor(
    public store: Store,
    public route: ActivatedRoute,
    public router: Router,
    public modalController: ModalController,
    public animationCtrl: AnimationController,
    public actionSheetController: ActionSheetController,
    public navController: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public postsService: PostsService,
  ) {
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
      this.presentLoading();
      this.deletePost();
    }
  }

  public editMode() {
    const post = this.store.selectSnapshot(PostsState.getPostDetail);
    const navigationExtras = {
      animated: false,
      state: {
        post: post,
      },
    };
    this.navController.navigateForward(['/main/edit'], navigationExtras);
  }

  public deletePost() {
    const post = this.store.selectSnapshot(PostsState.getPostDetail);
    this.store.dispatch(new DeletePost(post._id))
      .subscribe(
        (res) => {
          this.loadingController.dismiss();
          this.presentToast('deleted success.', 'success');
          this.navController.navigateBack(['/main/home']);
        },
        (error) => {
          this.loadingController.dismiss();
          this.presentToast('failed to delete post.', 'danger');
        }
      );
  }

  public async presentToast(msg, toastColor) {
    const toast = await this.toastController.create({
      color: toastColor,
      message: msg,
      duration: 1200,
    });
    toast.present();
  }

  public async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 9999
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
