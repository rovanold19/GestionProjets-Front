import { TestBed } from '@angular/core/testing';

import { Fichier } from './fichier';

describe('Fichier', () => {
  let service: Fichier;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fichier);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
