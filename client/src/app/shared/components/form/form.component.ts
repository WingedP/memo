
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { PostsAction } from 'src/app/main/states/postsStates/posts.actions';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() post: any;
  public postForm: FormGroup;
  public isSubmitted = false;

  constructor(
    public store: Store,
    public postsService: PostsService,
    public errorHandlingService: ErrorHandlingService,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public navController: NavController,
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
      user: 'ashlad',
      creator: 'ashlad',
      title: '',
      message: '',
      visited: false,
      selectedFile: 'https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg'
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
    this.store.dispatch([new PostsAction.createPost(body)])
      .subscribe(
        (res) => {
          this.presentToast('created success.', 'success');
          this.isSubmitted = false;
          this.navController.navigateBack(['/main/home']);
        },
        (error) => {
          this.presentToast('failed to create new post.', 'danger');
          this.isSubmitted = false;
        }
      );
  }

  public updatePost(body) {
    this.store.dispatch([new PostsAction.updatePost(body, this.post._id)])
      .subscribe(
        (res) => {
          this.presentToast('updated success.', 'success');
          this.isSubmitted = false;
          this.navController.navigateBack(['/main/home']);
        },
        (error) => {
          this.presentToast('failed to update post.', 'danger');
          this.isSubmitted = false;
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

}

// submit with normal method:

// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PostsService } from 'src/app/services/posts.service';
// import { NavController, ToastController } from '@ionic/angular';

// @Component({
//   selector: 'app-form',
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.scss'],
// })
// export class FormComponent implements OnInit {
//   @Input() post: any;
//   postForm: FormGroup;
//   isSubmitted = false;

//   constructor(
//     public postsService: PostsService,
//     public formBuilder: FormBuilder,
//     public toastController: ToastController,
//     public navController: NavController,
//   ) {
//     // empty
//   }

//   public ngOnInit() {
//     // create new
//     this.initForm();

//     // edit existing post
//     if (this.post) {
//       this.editModePatchForm();
//     }
//   }

//   public initForm() {
//     this.postForm = this.formBuilder.group({
//       user: 'ashlad',
//       creator: 'ashlad',
//       title: '',
//       message: '',
//       visited: false,
//       selectedFile: ''
//     })
//   }

//   public editModePatchForm() {
//     this.postForm.patchValue({
//       user: this.post.user,
//       title: this.post.title,
//       message: this.post.message,
//       visited: this.post.visited,
//       selectedFile: this.post.selectedFile,
//     });
//   }

//   public testSubmitForm() {
//     console.log(this.postForm.value)
//   }

//   public submitForm() {
//     this.isSubmitted = true;
//     console.log(this.postForm.value)
//     if (!this.postForm.valid) {
//       const msg = 'Please provide all the required values!';
//       this.presentToast(msg, 'danger');
//       return false;

//     } else {
//       const body = this.postForm.value;

//       if (this.post) {
//         this.postsService.updatePost(body, this.post._id).subscribe((res) => {
//           this.presentToast('edit success.', 'success');
//           this.isSubmitted = false;
//           this.navController.navigateBack(['/main/home']);
//         });

//         return;
//       }

//       this.postsService.createPost(body).subscribe((res) => {
//         this.presentToast('created success.', 'success');
//         this.isSubmitted = false;
//         this.navController.navigateBack(['/main/home']);
//       })

//     }
//   }

//   public changeVisitStatus(e) {
//     this.postForm.patchValue({
//       visited: e.detail.checked,
//     });
//   }

//   public async presentToast(msg, toastColor) {
//     const toast = await this.toastController.create({
//       color: toastColor,
//       message: msg,
//       duration: 1200,
//     });
//     toast.present();
//   }

// // public addPost() {
// //     this.formSubscription.add(
// //       this.formSubscription = this.store.dispatch(new AddTodo(this.todoForm.value)).subscribe(() => {
// //         this.clearForm();
// //       })
// //     );
// //   }

// }
