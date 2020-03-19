import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedCoursesComponent } from './recommended-courses.component';

describe('RecommendedCoursesComponent', () => {
  let component: RecommendedCoursesComponent;
  let fixture: ComponentFixture<RecommendedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
