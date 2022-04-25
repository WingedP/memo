
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage]
    });
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  }));

  test('should exist', () => {
    expect(component).toBeDefined();
  });

  test('load first page', () => {

  });

});
