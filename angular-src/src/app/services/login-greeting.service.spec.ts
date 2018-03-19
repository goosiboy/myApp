import { TestBed, inject } from '@angular/core/testing';

import { LoginGreetingService } from './login-greeting.service';

describe('LoginGreetingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGreetingService]
    });
  });

  it('should be created', inject([LoginGreetingService], (service: LoginGreetingService) => {
    expect(service).toBeTruthy();
  }));
});
