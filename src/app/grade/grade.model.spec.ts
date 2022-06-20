import { Grade } from './grade.model';

describe('User', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Grade()).toBeTruthy();
  });
});
