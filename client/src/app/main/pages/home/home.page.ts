import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import { ListComponent } from 'src/app/shared/components/list/list.component';
import { getPosts } from '../../states/postsStates/posts.actions';
import { PostsState } from '../../states/postsStates/posts.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @Select(PostsState.getPostsList) posts$: Observable<any>;
  @ViewChild('ioninfinite') infiniteScroll: IonInfiniteScroll;
  @ViewChild('listComponent') listComponent: ListComponent;
  private destroy: Subject<boolean> = new Subject<boolean>();

  public posts = [];
  public gridPosts = [];
  public gridMode: boolean = false;
  public limit: number = 9;
  public currentPage: number = 1;
  public timeOut: number = 400;
  public noMorePost = false;
  public isLoading = true;

  constructor(
    private store: Store,
    public router: Router,
    public postsService: PostsService,
  ) {
    // empty
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  public ngOnInit() {
    const request = { limit: this.limit, page: this.currentPage };
    this.fetchPosts(undefined, request);
    this.getPosts();
  }

  public getPosts() {
    this.posts$.pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        this.posts = res;
      });
  }

  public fetchPosts(event, request) {
    if (!event) {
      this.store.dispatch(new getPosts(request))
        .pipe(takeUntil(this.destroy))
        .subscribe((res) => {
          this.isLoading = false;
          this.currentPage++;
          this.infiniteScroll.disabled = res.PostsState.currentPage === res.PostsState.totalPages;
          this.noMorePost = this.infiniteScroll.disabled;
        });
      return;
    }

    if (event) {
      setTimeout(() => {
        this.store.dispatch(new getPosts(request))
          .pipe(takeUntil(this.destroy))
          .subscribe((res) => {
            this.currentPage++;
            if (event) {
              event?.target?.complete();
              this.listComponent?.virtualScroll?.checkEnd();
              this.infiniteScroll.disabled = res.PostsState.currentPage === res.PostsState.totalPages;
              this.noMorePost = this.infiniteScroll.disabled;
            }
          });
      }, 400);
    }
  }

  public changeViewMode() {
    this.gridMode = !this.gridMode;
  }

}
