import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonVirtualScroll, LoadingController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { PostsService } from 'src/app/services/posts.service';
import { PostsState } from 'src/app/main/states/postsStates/posts.state';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/datatypes/interfaces/post.interface';
import { GetPostDetail } from 'src/app/main/states/postsStates/posts.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Select(PostsState.getPostsList)
  posts$: Observable<Post[]>;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @Input() gridMode: boolean;
  public gridPosts;

  constructor(
    public store: Store,
    public router: Router,
    public postsService: PostsService,
    public loadingController: LoadingController,
  ) { }

  public ngOnInit() {
    this.posts$.pipe(untilDestroyed(this)).subscribe((res) => {
      this.gridPosts = this.postsService.group3Elements(res, 3);
    });
  }

  public async openDetail(post) {
    this.presentLoading();
    await this.store.dispatch(new GetPostDetail(post._id)).toPromise();
    this.loadingController.dismiss();

    this.router.navigate([`/main/detail/${post._id}`]);
  }

  public async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 50000,
      cssClass: 'custom-loading',
    });
    await loading.present();
  }

}
