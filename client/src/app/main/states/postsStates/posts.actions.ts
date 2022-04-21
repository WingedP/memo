import { Pagination } from "src/app/core/datatypes/interfaces/pagination.interface";
import { Post } from "src/app/core/datatypes/interfaces/post.interface";

export enum Actions {
  GetPosts = '[Post] Get Post action',
  GetPostDetail = '[Post] Get Post Detail action',
  CreatePost = '[Post] Create Post action',
  UpdatePost = '[Post] Update Post action',
  DeletePost = '[Post] Delete Post action',
}

export class GetPosts {
  static readonly type = Actions.GetPosts;
  constructor(public request: Pagination) { }
}

export class GetPostDetail {
  static readonly type = Actions.GetPostDetail;
  constructor(public id: string) { }
}

export class CreatePost {
  static readonly type = Actions.CreatePost;
  constructor(public payload: Post) { }
}

export class UpdatePost {
  static readonly type = Actions.UpdatePost;
  constructor(public payload: Post, public id: string) { }
}

export class DeletePost {
  static readonly type = Actions.DeletePost;
  constructor(public id: string) { }
}
