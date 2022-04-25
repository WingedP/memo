import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Actions, NgxsModule, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
// import { GetPosts, GetPostDetail, CreatePost, UpdatePost, DeletePost } from '@app/main/state/posts.actions';
import { PostsState } from './posts.state';
import { PhotoService } from 'src/app/services/photo.service';
import { CreatePost, DeletePost, GetPostDetail, GetPosts, UpdatePost } from './posts.actions';

export class ProviderClass {
  public static readonly PhotoService = PhotoService.name;
}

export const AppStateProviders: Array<string> = [
  ProviderClass.PhotoService,
];

describe('PostsState', () => {
  let store: Store = null;
  let actions$: Observable<any>;
  let photoService: PhotoService;

  const stateList = [PostsState];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot(stateList)],
    });

    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions);

    photoService = TestBed.inject(PhotoService);

    spyOn(photoService, 'capturePhoto');
    spyOn(photoService, 'uploadPhotoToStorage');
  });

  describe('test Actions', () => {
    let ISOLATED_MOCK_STATE = <any>{};

    afterEach(() => {
      ISOLATED_MOCK_STATE = null;
    });

    it('should get posts', async () => {
      await store.dispatch(new GetPosts()).toPromise();

    });

    it('should get posts detail', async () => {
      await store.dispatch(new GetPostDetail()).toPromise();

    });

    it('should create post', async () => {
      await store.dispatch(new CreatePost()).toPromise();

    });

    it('should update post', async () => {
      await store.dispatch(new UpdatePost()).toPromise();

    });

    it('should delete post', async () => {
      await store.dispatch(new DeletePost()).toPromise();

    });
  });

});
