import { TestBed } from '@angular/core/testing';

import { Vergil } from './vergil';

describe('Vergil', () => {
  let service: Vergil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vergil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
