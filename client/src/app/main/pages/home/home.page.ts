import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { PostsService } from 'src/app/services/posts.service';
import { ListComponent } from 'src/app/shared/components/list/list.component';
import { GetPosts } from '../../states/postsStates/posts.actions';
import { PostsState } from '../../states/postsStates/posts.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements AfterViewInit {
  @ViewChild('ioninfinite') infiniteScroll: IonInfiniteScroll;
  @ViewChild('listComponent') listComponent: ListComponent;

  public gridMode: boolean = false;
  public limit: number = 9;
  public currentPage: number = 1;
  public noMorePost = false;
  public isLoading = true;
  public disableScroll = true;

  constructor(
    private store: Store,
    private actions$: Actions,
    public router: Router,
    public postsService: PostsService,
    public cd: ChangeDetectorRef
  ) {
    // empty
  }

  public ngAfterViewInit(): void {
    const request = { limit: this.limit, page: this.currentPage };
    this.fetchPosts(undefined, request);
  }

  public fetchPosts(event, request) {
    if (!event) {
      this.load1stPage(request);
      return;
    }

    if (event) {
      this.loadMore(event, request);
    }
  }

  public load1stPage(request) {
    this.store.dispatch(new GetPosts(request));
    this.actions$.pipe(ofActionSuccessful(GetPosts), untilDestroyed(this)).subscribe(() => {
      this.isLoading = false;
      this.cd.markForCheck();

      this.infiniteScroll.disabled = false;
      this.disableInfiniteScroll();
    });
  }

  public loadMore(event, request) {
    setTimeout(() => {
      this.store.dispatch(new GetPosts(request));
    }, 400);

    this.actions$.pipe(ofActionSuccessful(GetPosts), untilDestroyed(this)).subscribe((res) => {
      this.isLoading = false;
      this.currentPage = res.request.page;
      event?.target?.complete();
      this.listComponent?.virtualScroll?.checkEnd();
      this.disableInfiniteScroll();
    });
  }

  public disableInfiniteScroll() {
    const { currentPage, totalPages } = this.store.selectSnapshot(PostsState);

    if (currentPage === totalPages) {
      this.infiniteScroll.disabled = currentPage === totalPages;
      this.noMorePost = this.infiniteScroll?.disabled;
    }
  }

  public changeViewMode() {
    this.gridMode = !this.gridMode;
  }

}
