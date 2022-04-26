
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { SharedModule } from '@shared/shared.module';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NgxsModule, Store } from '@ngxs/store';
import { PostsState } from '@main/states/postsStates/posts.state';
import { GetPosts } from '@main/states/postsStates/posts.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createMockStateData } from '@app/unit-test-helper';
import { IonicModule } from '@ionic/angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let store: Store;
  const stateList = [PostsState];
  const MOCK_STATE = createMockStateData(stateList);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
        IonicModule,
        NgxsModule.forRoot(stateList, { developmentMode: true }),
      ],
      declarations: [HomePage],
      providers: [MockProvider(Router)],
    }).compileComponents();

    store = TestBed.inject(Store);
    store.reset(MOCK_STATE);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load first page when app starts', () => {
    jest.spyOn(store, 'dispatch').mockReturnValue(of());
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(GetPosts));
  });

});
