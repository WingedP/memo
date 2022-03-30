import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-createPost',
  templateUrl: './createPost.page.html',
  styleUrls: ['./createPost.page.scss'],
})
export class CreatePostPage implements ViewDidEnter {
  public post: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.post = this.router.getCurrentNavigation().extras.state.post;
      }
    });
  }

  public ionViewDidEnter() {
    // empty
  }

}
