import { TestBed } from '@angular/core/testing';

// @ts-ignore
import { GradedTaskService } from './graded-task.service';

describe('GradedTaskService', () => {
  let service: GradedTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradedTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
