export interface Post {
  _id: string;
  title: String,
  message: String,
  user: String,
  creator: String,
  selectedFile: String,
  visited: Boolean,
}
export class PostsStateModel {
  posts: Post[];
  currentPage: Number;
  totalPages: Number;
}
