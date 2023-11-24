import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { DetailsNavbarGuard } from './details-navbar.guard';

describe('DetailsNavbarGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => DetailsNavbarGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
