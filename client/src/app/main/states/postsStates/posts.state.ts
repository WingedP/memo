import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { patch, updateItem, removeItem } from '@ngxs/store/operators';
import { PostsStateModel } from "./posts.model";
import { PostsService } from "src/app/services/posts.service";
import { GetPosts, CreatePost, UpdatePost, DeletePost, GetPostDetail } from "./posts.actions";
import { Post } from "src/app/core/datatypes/interfaces/post.interface";

const POSTS_STATE_TOKEN = new StateToken<PostsStateModel>(
  'PostsState'
);
@State<PostsStateModel>({
  name: POSTS_STATE_TOKEN,
  defaults: {
    posts: [],
    postDetail: undefined,
    currentPage: 1,
    totalPages: 1,
  }
})

@Injectable({
  providedIn: 'root'
})
export class PostsState {
  constructor(
    public postsService: PostsService,
  ) {
    // empty
  }

  @Selector()
  static getPostsList(state: PostsStateModel): Post[] {
    return state.posts;
  }

  @Selector()
  static getPostDetail(state: PostsStateModel): Post {
    return state.postDetail;
  }

  @Action(GetPosts)
  async getPosts(context: StateContext<PostsStateModel>, { request }: GetPosts) {
    const result = await this.postsService.getPosts(request).toPromise();
    const state = context.getState();

    if (result.currentPage === 1) {
      context.patchState({ posts: result.posts, currentPage: result.currentPage, totalPages: result.numberOfPages });
      return;
    }

    if (result.currentPage > 1) {
      const postsList = [...state.posts];
      postsList.push.apply(postsList, result.posts);
      context.patchState({ posts: postsList, currentPage: result.currentPage, totalPages: result.numberOfPages });
    }
  }

  @Action(GetPostDetail)
  async getPostDetail(context: StateContext<PostsStateModel>, { id }: GetPostDetail) {
    const result = await this.postsService.getPost(id).toPromise();
    context.patchState({ postDetail: result });
  }

  @Action(CreatePost)
  async createPost(context: StateContext<PostsStateModel>, { payload }: CreatePost) {
    const result = await this.postsService.createPost(payload).toPromise();
    const state = context.getState();
    context.patchState({ posts: [result, ...state.posts] });
  }

  @Action(UpdatePost)
  async updatePost(context: StateContext<PostsStateModel>, { payload, id }: UpdatePost) {
    const result = await this.postsService.updatePost(payload, id).toPromise();
    context.setState(
      patch({
        posts: updateItem(post => post._id === result._id, result)
      })
    );
  }

  @Action(DeletePost)
  async deletePost(context: StateContext<PostsStateModel>, { id }: DeletePost) {
    await this.postsService.deletePost(id).toPromise();
    context.setState(
      patch({
        posts: removeItem(post => post._id === id)
      })
    );
  }

}
