import { TestBed } from '@angular/core/testing';

import { CanDeactivateCartGuard } from './can-deactivate-cart.guard';

describe('CanDeactivateCartGuard', () => {
  let guard: CanDeactivateCartGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactivateCartGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
