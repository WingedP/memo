import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { PostsService } from "@services/posts.service";
import { ListComponent } from '@shared/components/list/list.component';
import { GetPosts } from '../../states/postsStates/posts.actions';
import { PostsState } from '../../states/postsStates/posts.state';
import { UntilDestroy } from '@ngneat/until-destroy';

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

  public async load1stPage(request) {
    await this.store.dispatch(new GetPosts(request)).toPromise();
    this.isLoading = false;
    this.cd.markForCheck();
    this.infiniteScroll.disabled = false;
    this.disableInfiniteScroll();
  }

  public async loadMore(event, request) {
    const result = await this.store.dispatch(new GetPosts(request)).toPromise();
    this.isLoading = false;
    this.currentPage = result.PostsState.currentPage;

    event?.target?.complete();
    this.listComponent?.virtualScroll?.checkEnd();
    this.disableInfiniteScroll();
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
