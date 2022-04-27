import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PostsState } from "@app/main/states/postsStates/posts.state";
import { SharedModule } from "@app/shared/shared.module";
import { createMockStateData } from "@app/unit-test-helper";
import { IonicModule, NavController } from "@ionic/angular";
import { NgxsModule, Store } from "@ngxs/store";
import { MockProvider } from "ng-mocks";
import { DetailPage } from "./detail.page";

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
      providers: [{
        provide: ActivatedRoute,
        useValue: {},
      },
      MockProvider(Router),
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

  // presentActionSheet
  it('should open action Controller when click', () => {
    spyOn(component, 'presentActionSheet');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.presentActionSheet).toHaveBeenCalled();
    });
  });

  // // confirmDeleteModal
  // it('should open confirm delete modal when choose delete', () => {

  // });

  // // editMode
  // it('should navigate to edit mode/page', () => {
  //   jest.spyOn(router, 'navigate').mockResolvedValueOnce(undefined);

  // });

  // // deletePost
  // it('should delete post if user confirm delete', () => {

  // });


});
