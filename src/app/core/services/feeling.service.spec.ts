import { TestBed, inject } from '@angular/core/testing';

import { FeelingService } from './feeling.service';

describe('FeelingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeelingService]
    });
  });

  it('should be created', inject([FeelingService], (service: FeelingService) => {
    expect(service).toBeTruthy();
  }));
});
