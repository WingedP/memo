export interface Post {
  _id: string;
  title: string,
  message: string,
  user: string,
  creator: string,
  selectedFile: string,
  visited: boolean,
}
export class PostsStateModel {
  posts: Post[];
  postDetail: Post;
  currentPage: Number;
  totalPages: Number;
}
