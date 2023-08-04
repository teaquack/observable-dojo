import { TestBed } from '@angular/core/testing';

import { SupabaseHttpService } from './supabase-http.service';

describe('SupabaseHttpService', () => {
  let service: SupabaseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
