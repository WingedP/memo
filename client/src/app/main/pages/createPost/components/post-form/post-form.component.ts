import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createPost, updatePost } from 'src/app/main/states/postsStates/posts.actions';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { PhotoService } from 'src/app/services/photo.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit, OnDestroy {
  @Input() post: any;
  public postForm: FormGroup;
  public isSubmitted = false;
  public placeholder = 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png';
  public psyduck = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png';
  private destroy: Subject<boolean> = new Subject<boolean>();
  public isSubmitting = false;

  constructor(
    public store: Store,
    public postsService: PostsService,
    public photoService: PhotoService,
    public errorHandlingService: ErrorHandlingService,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public navController: NavController,
  ) {
    // empty
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  public ngOnInit() {
    this.initForm(); // [for creating new post]

    if (this.post) { // [for updating/editing post]
      this.editModePatchForm();
    }

    this.patchPhotoToForm();
  }

  public initForm() {
    this.postForm = this.formBuilder.group({
      user: 'Nhan',
      creator: 'Nhan',
      title: '',
      message: '',
      visited: false,
      selectedFile: this.placeholder,
    });
  }

  public editModePatchForm() {
    console.log(1, this.post);

    this.postForm.patchValue({
      user: this.post.user,
      title: this.post.title,
      message: this.post.message,
      visited: this.post.visited,
      selectedFile: this.post.selectedFile,
    });
  }

  public patchPhotoToForm() {
    this.photoService.addPhotoAction$.pipe(
      takeUntil(this.destroy)
    ).subscribe((photo) => {
      this.postForm.patchValue({
        selectedFile: photo.webviewPath,
      });
    });
  }

  public submitForm() {
    this.isSubmitted = true;

    if (!this.postForm.valid) {
      const msg = 'Please provide all the required values!';
      this.presentToast(msg, 'danger');
      return false;

    } else {
      const body = this.postForm.value;

      if (this.post) { // update/edit post
        this.updatePost(body);
        return;
      }

      this.addPost(body); // create new post
    }
  }

  public addPost(body) {
    this.isSubmitting = true;
    this.store.dispatch([new createPost(body)])
      .subscribe(
        (res) => {
          this.presentToast('created success.', 'success');
          this.isSubmitting = false;
          this.navController.navigateBack(['/main/home']);
          this.photoService.photos = [];
        },
        (error) => {
          this.presentToast('failed to create new post.', 'danger');
          this.isSubmitting = false;
          this.photoService.photos = [];
        }
      );
  }

  public updatePost(body) {
    this.isSubmitting = true;
    this.store.dispatch([new updatePost(body, this.post._id)])
      .subscribe(
        (res) => {
          this.presentToast('updated success.', 'success');
          this.isSubmitting = false;
          this.navController.navigateBack(['/main/home']);
          this.photoService.photos = [];
        },
        (error) => {
          this.presentToast('failed to update post.', 'danger');
          this.isSubmitting = false;
          this.photoService.photos = [];
        }
      );
  }

  public changeVisitStatus(e) {
    this.postForm.patchValue({
      visited: e.detail.checked,
    });
  }

  public async presentToast(msg, toastColor) {
    const toast = await this.toastController.create({
      color: toastColor,
      message: msg,
      duration: 1200,
    });
    toast.present();
  }

  public addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
