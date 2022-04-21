import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-activity',
  templateUrl: './post-activity.page.html',
  styleUrls: ['./post-activity.page.scss'],
})
export class PostActivityPage {
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

}
