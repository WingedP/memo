import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/datatypes/interfaces/post.interface';

@Component({
  selector: 'app-post-activity',
  templateUrl: './post-activity.page.html',
  styleUrls: ['./post-activity.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostActivityPage {
  public post: Post;

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
