import { TestBed } from '@angular/core/testing';

import { FiletransferService } from './filetransfer.service';

describe('FiletransferService', () => {
  let service: FiletransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiletransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
