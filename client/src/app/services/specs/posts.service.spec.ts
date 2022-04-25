import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { BaseService } from "../base.service";
import { PostsService } from "../posts.service";

import { HttpClient } from '@angular/common/http';
import { mockPosts } from "../mocks/mock-data/posts";
import { environment } from "../../../environments/environment";
import { Post } from "src/app/core/datatypes/interfaces/post.interface";
import { mockPost } from "../mocks/mock-data/post";

describe('PostsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let postsService: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [
          PostsService,
          BaseService,
        ]
      }
    ); // real service

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController); // htttp mock
    postsService = TestBed.inject(PostsService);
  });

  it('postService should be created', () => {
    expect(postsService).toBeTruthy();
  });

  it('should get posts', () => {
    const url: string = `${environment.baseUrl}/posts`;
    const mockPostsData = mockPosts as unknown as Post[]; // mock data

    postsService.getPosts().subscribe((res) => {
      expect(res).toEqual(mockPostsData); // data needs to look like mock data
    });

    const req = httpTestingController.expectOne(url); // need to have url
    expect(req.request.method).toEqual('GET'); // need to have this method

    req.flush(mockPostsData);
    httpTestingController.verify();
  });


  it('should create post', () => {
    const mockPayload = {
      creator: "Nhan",
      message: "hi there",
      selectedFile: "https://res.cloudinary.com",
      title: "hi",
      user: "Nhan",
      visited: false,
    };
    const mockPostData = mockPost as unknown as Post;

    postsService.createPost(mockPayload).subscribe((res) => {
      expect(res).toEqual(mockPostData);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}/posts`);
    expect(req.request.method).toEqual('POST');

    req.flush(mockPostData);
    httpTestingController.verify();
  });

  it('should update post', () => {
    const mockPayload = {
      createdAt: "2022",
      creator: "Nhan",
      message: "eewerg",
      selectedFile: "https://res.cloudinary",
      title: "ahahaha",
      user: "nhan",
      __v: 0,
      _id: "23231",
    };
    const mockPostData = mockPost as unknown as Post;

    postsService.updatePost(mockPayload, mockPayload._id).subscribe((res) => {
      expect(res).toEqual(mockPostData);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}/posts/${mockPayload._id}`);
    expect(req.request.method).toEqual('PATCH');

    req.flush(mockPostData);
    httpTestingController.verify();
  });

  it('should delete post', () => {
    const mockPayload = {
      _id: 'id',
    };

    postsService.deletePost(mockPayload._id).subscribe((res) => {
      expect(res).toEqual({ "message": "Post zzzz successfully." });
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}/posts/${mockPayload._id}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(mockPayload);
    httpTestingController.verify();
  });

});
