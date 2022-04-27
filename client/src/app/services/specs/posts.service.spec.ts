import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { mockPosts } from "../mocks/mock-data/posts";
import { environment } from "../../../environments/environment";
import { Post } from "src/app/core/datatypes/interfaces/post.interface";
import { mockPost } from "../mocks/mock-data/post";
import { PostsService } from "../posts.service";

describe('PostsService', () => {
  let postsService: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    });

    postsService = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should get posts', done => {
    const url: string = `${environment.baseUrl}/posts`;
    const mockPostsData = mockPosts as unknown as Post[];

    postsService.getPosts().subscribe((res) => {
      expect(res).toEqual(mockPostsData);
      done();
    });

    const httpRequest = httpMock.expectOne(url);
    expect(httpRequest.request.method).toEqual('GET');

    httpRequest.flush(mockPostsData);
    httpMock.verify();
  });

  it('should create post', done => {
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
      done();
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/posts`);
    expect(req.request.method).toEqual('POST');

    req.flush(mockPostData);
    httpMock.verify();
  });

  it('should update post', done => {
    const mockPayload = {
      createdAt: "2022",
      creator: "creator's name",
      message: "post's message",
      selectedFile: "https://res.cloudinary.jpg",
      title: "post's title",
      user: "creator's name",
      __v: 0,
      _id: "123123",
    };
    const mockPostData = mockPost as unknown as Post;

    postsService.updatePost(mockPayload, mockPayload._id).subscribe((res) => {
      expect(res).toEqual(mockPostData);
      done();
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/posts/${mockPayload._id}`);
    expect(req.request.method).toEqual('PATCH');

    req.flush(mockPostData);
    httpMock.verify();
  });

  it('should delete post', done => {
    const mockPayload = {
      _id: '23231',
    };

    postsService.deletePost(mockPayload._id).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/posts/${mockPayload._id}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(mockPayload);
    httpMock.verify();
  });

});
