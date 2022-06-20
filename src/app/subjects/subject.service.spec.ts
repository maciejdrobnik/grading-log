import { TestBed } from '@angular/core/testing';

// @ts-ignore
import { SubjectService } from './subject.service';

describe('StudentService', () => {
  let service: SubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
