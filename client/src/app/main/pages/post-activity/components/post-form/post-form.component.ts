import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Actions, Store, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CreatePost, UpdatePost } from 'src/app/main/states/postsStates/posts.actions';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { PhotoService } from 'src/app/services/photo.service';
import { PostsService } from 'src/app/services/posts.service';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Post } from 'src/app/core/datatypes/interfaces/post.interface';

@UntilDestroy()
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent implements OnInit {
  @Input() post: Post;
  public postForm: FormGroup;
  public updatedPhoto = undefined;
  public isSubmitted = false;
  public placeholder = '/assets/img/placeholder.svg';

  public isSubmitting = false;

  constructor(
    public store: Store,
    public cloudinary: Cloudinary,
    public cd: ChangeDetectorRef,
    public formBuilder: FormBuilder,
    public postsService: PostsService,
    public photoService: PhotoService,
    public errorHandlingService: ErrorHandlingService,
    public toastController: ToastController,
    public navController: NavController,
    private actions$: Actions,
  ) {
    // empty
  }

  public ngOnInit() {
    this.initForm(); // [for creating new post]

    if (this.post) { // [for updating/editing post]
      this.editModePatchForm();
    }
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
    this.postForm.patchValue({
      user: this.post.user,
      title: this.post.title,
      message: this.post.message,
      visited: this.post.visited,
      selectedFile: this.post.selectedFile,
    });

    this.updatedPhoto = this.post.selectedFile;
  }

  public async submitForm() {
    this.isSubmitted = true;

    if (!this.postForm.valid) {
      const msg = 'Please provide all the required values!';
      this.presentToast(msg, 'danger');
      return;
    }

    const body = this.postForm.value;

    if (this.post) { // update/edit post
      this.updatePost();
      return;
    }

    this.addPost(); // create new post
  }

  public async addPost() {
    this.isSubmitting = true;

    // if new post has new photo, upload to cloud & get url
    if (this.updatedPhoto && this.updatedPhoto !== this.placeholder) {
      const selectedPhoto = await this.uploadPicToCloudinary();
      this.postForm.patchValue({
        selectedFile: selectedPhoto.secure_url,
      });
    }

    this.store.dispatch(new CreatePost(this.postForm.value));

    this.actions$.pipe(ofActionSuccessful(CreatePost), untilDestroyed(this)).subscribe(() => {
      this.presentToast('created success.', 'success');
      this.isSubmitting = false;
      this.navController.navigateBack(['/main/home']);
    });

    this.actions$.pipe(ofActionErrored(CreatePost), untilDestroyed(this)).subscribe(() => {
      this.presentToast('failed to create new post.', 'danger');
      this.isSubmitting = false;
    });
  }

  public async updatePost() {
    this.isSubmitting = true;

    // if the photo is changed, upload new photo to cloud & get url
    if (this.updatedPhoto !== this.post.selectedFile) {
      const selectedPhoto = await this.uploadPicToCloudinary();
      this.postForm.patchValue({
        selectedFile: selectedPhoto.secure_url,
      });
    }

    this.store.dispatch(new UpdatePost(this.postForm.value, this.post._id));

    this.actions$.pipe(ofActionSuccessful(UpdatePost), untilDestroyed(this)).subscribe(() => {
      this.presentToast('updated success.', 'success');
      this.isSubmitting = false;
      this.navController.navigateBack(['/main/home']);
    });

    this.actions$.pipe(ofActionErrored(UpdatePost), untilDestroyed(this)).subscribe(() => {
      this.presentToast('failed to update post.', 'danger');
      this.isSubmitting = false;
    });
  }

  public async uploadPicToCloudinary() {
    let formData = new FormData();
    formData.append('file', this.updatedPhoto);
    formData.append('upload_preset', this.cloudinary.config().upload_preset);
    formData.append('cloud_name', this.cloudinary.config().cloud_name);
    const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);;
    formData.append('public_id', uid);

    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`;
    return this.photoService.uploadPhotoToStorage(formData, url).toPromise();
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

  public async addPhotoToGallery() {
    const photo = await this.photoService.capturePhoto();
    this.updatedPhoto = photo.webviewPath;
    this.cd.markForCheck();
  }

}
