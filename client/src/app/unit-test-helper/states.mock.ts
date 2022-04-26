import { PostsStateModel } from "@main/states/postsStates/posts.model";
import { PostsState } from "@main/states/postsStates/posts.state";

const DEFAULT_STATES: Array<any> = [
  {
    state: PostsState,
    payload: <PostsStateModel>{
      posts: [],
      postDetail: undefined,
      currentPage: 1,
      totalPages: 1,
    },
  },
];

/**
 * @description return the default values of all states
 */
export function getMockStatesDataSource(): Array<any> {
  for (let i = 0; DEFAULT_STATES.length > i; i++) {
    Object.freeze(DEFAULT_STATES[i]); // freeze all the objects in the array
  }
  return DEFAULT_STATES;
}
