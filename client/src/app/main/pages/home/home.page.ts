import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import { ListComponent } from 'src/app/shared/components/list/list.component';
import { PostsAction } from '../../states/postsStates/posts.actions';
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
  public noMorePost: boolean = false;

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
    switch (event) {
      case !event: // 1st load/ init
        this.store.dispatch(new PostsAction.getPosts(request))
          .pipe(takeUntil(this.destroy))
          .subscribe((res) => {
            this.currentPage++;
            this.infiniteScroll.disabled = res.PostsState.currentPage === res.PostsState.totalPages;
            this.noMorePost = this.infiniteScroll.disabled;
          });
        break;

      case event: // load more
        setTimeout(() => {
          this.store.dispatch(new PostsAction.getPosts(request))
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
        break;
    }
  }

  public changeViewMode() {
    this.gridMode = !this.gridMode;
  }

}


// normal way:

// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Select, Selector, Store } from '@ngxs/store';
// import { Observable, Subject } from 'rxjs';
// import { first, takeUntil } from 'rxjs/operators';
// import { PostsService } from 'src/app/services/posts.service';
// import { getPosts } from '../../states/postsStates/posts.actions';
// import { Post } from '../../states/postsStates/posts.model';
// import { PostsState } from '../../states/postsStates/posts.state';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.page.html',
//   styleUrls: ['./home.page.scss'],
// })
// export class HomePage implements OnInit {
//   public posts = [];

//   constructor(
//     public router: Router,
//     public postsService: PostsService,
//   ) { }

//   public ngOnInit() {
//     this.getPosts();
//   }

//   public getPosts() {
//     this.postsService.getPosts().subscribe((res) => {
//       this.posts = res.posts;
//     })
//   }

// }


// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Select, Selector, Store } from '@ngxs/store';
// import { Observable, Subject } from 'rxjs';
// import { first, takeUntil } from 'rxjs/operators';
// import { PostsService } from 'src/app/services/posts.service';
// import { getPosts } from '../../states/postsStates/posts.actions';
// import { Post } from '../../states/postsStates/posts.model';
// import { PostsState } from '../../states/postsStates/posts.state';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.page.html',
//   styleUrls: ['./home.page.scss'],
// })
// export class HomePage implements OnInit, OnDestroy {
//   private destroy: Subject<boolean> = new Subject<boolean>();
//   // @Select(PostsState.getPostsList) posts$: Observable<any>;
//   public posts = [];

//   constructor(
//     // private store: Store,
//     public router: Router,
//     public postsService: PostsService,
//   ) { }

//   public ngOnInit() {
//     this.getPosts();
//   }

//   // public getPosts() {
//   //   this.store.dispatch(new getPosts()); // @Action
//   //   this.posts$.pipe(takeUntil(this.destroy)).subscribe((res) => {
//   //     this.posts = res;
//   //   })
//   // }

//   public ngOnDestroy(): void {
//     this.destroy.next(true);
//     this.destroy.unsubscribe();
//   }

//   public getPosts() {
//     this.postsService.getPosts().subscribe((res) => {
//       this.posts = res.posts;
//     })
//   }

// }
