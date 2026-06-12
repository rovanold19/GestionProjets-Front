import { TestBed } from '@angular/core/testing';

import { ProjetService } from './projet';

describe('Projet', () => {
  let service: ProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetService);
  });

  it('doit etre creer', () => {
    expect(service).toBeTruthy();
  });
});
