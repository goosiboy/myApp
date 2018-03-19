import { TestBed, inject } from '@angular/core/testing';

import { MovieProfileService } from './movie-profile.service';

describe('MovieProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieProfileService]
    });
  });

  it('should be created', inject([MovieProfileService], (service: MovieProfileService) => {
    expect(service).toBeTruthy();
  }));
});
