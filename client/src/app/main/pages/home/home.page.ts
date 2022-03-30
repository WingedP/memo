import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public posts = [];

  constructor(
    public router: Router,
    public postsService: PostsService,
  ) { }

  public ngOnInit() {
    this.getPosts();
  }

  public getPosts() {
    this.postsService.getPosts().subscribe((res) => {
      this.posts = res.posts;
    })
  }

}
