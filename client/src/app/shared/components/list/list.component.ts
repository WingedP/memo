import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonReorderGroup, IonVirtualScroll } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { PostsService } from 'src/app/services/posts.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnChanges {
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @Input() posts: any;
  @Input() gridMode: any;
  public gridPosts: any;

  constructor(
    public store: Store,
    public router: Router,
    public postsService: PostsService,
    private sanitizer: DomSanitizer,
  ) {
    // empty
  }

  public ngOnChanges() {
    if (this.posts.length > 0) {
      this.gridPosts = this.postsService.group3Elements(this.posts, 3);
    }
  }

  public ngOnInit() {
    // empty
  }

  public openDetail(post) {
    let navigationExtras: NavigationExtras = {
      state: {
        post: post
      }
    };
    this.router.navigate(['/main/detail'], navigationExtras);
  }

}
