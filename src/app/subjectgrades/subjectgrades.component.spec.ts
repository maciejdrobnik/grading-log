import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectgradesComponent } from './subjectgrades.component';

describe('SubjectgradesComponent', () => {
  let component: SubjectgradesComponent;
  let fixture: ComponentFixture<SubjectgradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectgradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
