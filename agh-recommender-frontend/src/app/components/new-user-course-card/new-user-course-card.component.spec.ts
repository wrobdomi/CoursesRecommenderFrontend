import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserCourseCardComponent } from './new-user-course-card.component';

describe('NewUserCourseCardComponent', () => {
  let component: NewUserCourseCardComponent;
  let fixture: ComponentFixture<NewUserCourseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserCourseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
