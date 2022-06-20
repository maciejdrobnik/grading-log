import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradedTaskComponent } from './graded-task.component';

describe('GradedTaskComponent', () => {
  let component: GradedTaskComponent;
  let fixture: ComponentFixture<GradedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradedTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
