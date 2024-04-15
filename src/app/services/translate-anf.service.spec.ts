import { TestBed } from '@angular/core/testing';

import { TranslateAnfService } from './translate-anf.service';

describe('TranslateAnfService', () => {
  let service: TranslateAnfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateAnfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
