import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationTache } from './modification-tache';

describe('ModificationTache', () => {
  let component: ModificationTache;
  let fixture: ComponentFixture<ModificationTache>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationTache]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationTache);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
