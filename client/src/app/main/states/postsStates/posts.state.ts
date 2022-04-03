import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { PostsStateModel } from "./posts.model";
import { PostsService } from "src/app/services/posts.service";
import { tap } from 'rxjs/operators';
import { PostsAction } from "./posts.actions";

const POSTS_STATE_TOKEN = new StateToken<PostsStateModel>(
  'PostsState'
);
@State<PostsStateModel>({
  name: POSTS_STATE_TOKEN,
  defaults: {
    posts: [],
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
  static getPostsList(state: PostsStateModel) {
    return state.posts;
  }

  @Action(PostsAction.getPosts)
  getPosts(context: StateContext<PostsStateModel>, { request }: any) {
    return this.postsService.getPosts(request).pipe(tap((res) => {
      const state = context.getState();

      if (res.currentPage === 1) {
        context.setState({ ...state, posts: res.posts, currentPage: res.currentPage, totalPages: res.numberOfPages });
      } else {
        const postsList = [...state.posts];
        postsList.push.apply(postsList, res.posts);
        context.patchState({ ...state, posts: postsList, currentPage: res.currentPage, totalPages: res.numberOfPages });
      }
    }));
  }

  @Action(PostsAction.createPost)
  createPost(context: StateContext<PostsStateModel>, { payload }: PostsAction.createPost) {
    return this.postsService.createPost(payload).pipe(tap((res) => {
      const state = context.getState();
      context.patchState({ posts: [res, ...state.posts] });
    }));
  }

  @Action(PostsAction.updatePost)
  updatePost(context: StateContext<PostsStateModel>, { payload, id }: PostsAction.updatePost) {
    return this.postsService.updatePost(payload, id).pipe(tap((res) => {
      const state = context.getState();
      const postsList = [...state.posts];
      const editedPostIndex = postsList.findIndex(item => item._id === id);
      postsList[editedPostIndex] = res;
      context.setState({ ...state, posts: postsList });
    }));
  }

  @Action(PostsAction.deletePost)
  deletePost(context: StateContext<PostsStateModel>, { id }: PostsAction.deletePost) {
    return this.postsService.deletePost(id).pipe(tap(() => {
      const state = context.getState();
      const newPostsList = state.posts.filter(item => item._id !== id); // remove deleted post from posts
      context.setState({ ...state, posts: newPostsList });
    }));
  }

  @Action(PostsAction.reorderPost)
  reorderPost(context: StateContext<PostsStateModel>, { payload }: PostsAction.reorderPost) {
    return this.postsService.reorderPost(payload).pipe(tap((res) => {
      const state = context.getState();
      console.log(1, res);

      context.setState({ ...state, posts: res.posts });
    }));
  }

}
