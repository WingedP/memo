import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, Router, } from '@angular/router';
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { PostsState } from "@app/main/states/postsStates/posts.state";
import { SharedModule } from "@app/shared/shared.module";
import { createMockStateData } from "@app/unit-test-helper";
import { IonicModule, ModalController, NavController } from "@ionic/angular";
import { NgxsModule, Store } from "@ngxs/store";
import { MockProvider } from "ng-mocks";
import { DetailPage } from "./detail.page";
import { NavMock } from "@app/services/mocks/mock-data/navMock";
import { mockPost } from "@app/services/mocks/mock-data/post";
import { Post } from "@app/core/datatypes/interfaces/post.interface";
import { DeletePost } from "@app/main/states/postsStates/posts.actions";
import { of } from "rxjs";
import { ModalControllerMock } from "@app/unit-test-helper/modal-controller.mock";

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;
  let store: Store;
  let router: Router;

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
      declarations: [DetailPage],
      providers: [
        {
          provide: ModalController,
          useClass: ModalControllerMock
        },
        { provide: ActivatedRoute, useValue: {} },
        { provide: NavController, useClass: NavMock },
        MockProvider(Router),
        MockProvider(Store),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    store.reset(MOCK_STATE);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('confirm modal should open when click', () => {
    const alertControllerStub = jest.spyOn('ModalController', ['create']);

  })

  it('should call deletePost with post\'s id', () => { // test deletePost()
    const mockPostData = mockPost as unknown as Post;

    jest.spyOn(store, 'selectSnapshot').mockReturnValue(of(mockPostData));
    jest.spyOn(store, 'dispatch');
    jest.spyOn(component, 'deletePost');

    component.deletePost();

    expect(store.dispatch).toHaveBeenCalledWith(new DeletePost(mockPostData._id));
  });

  it('should navigate to edit mode/page', () => { // test editMode()
    const navCtrl = fixture.debugElement.injector.get(NavController);
    const mockPostData = mockPost as unknown as Post;
    const navigationExtras = { state: { post: mockPostData } };

    jest.spyOn(store, 'selectSnapshot').mockReturnValue(mockPostData);
    jest.spyOn(component, 'editMode');
    jest.spyOn(navCtrl, 'navigateForward');

    component.editMode();

    expect(navCtrl.navigateForward).toHaveBeenCalledTimes(1);
    expect(navCtrl.navigateForward).toHaveBeenCalledWith(['/main/edit'], navigationExtras);
  });

});
