import { TestBed } from '@angular/core/testing';

import { NavPlanetService } from './nav-planet.service';

describe('NavPlanetService', () => {
  let service: NavPlanetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavPlanetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
