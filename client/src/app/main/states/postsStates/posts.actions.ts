
export enum Actions {
  GetPosts = '[Post] Get Post action',
  CreatePost = '[Post] Create Post action',
  UpdatePost = '[Post] Update Post action',
  DeletePost = '[Post] Delete Post action',
  ReorderPost = '[Post] Reorder Post action',
}

export class getPosts {
  static readonly type = Actions.GetPosts;
  constructor(public request: Object) { }
}

export class createPost {
  static readonly type = Actions.CreatePost;
  constructor(public payload: Object) { }
}

export class updatePost {
  static readonly type = Actions.UpdatePost;
  constructor(public payload: Object, public id: string) { }
}

export class deletePost {
  static readonly type = Actions.DeletePost;
  constructor(public id: string) { }
}
