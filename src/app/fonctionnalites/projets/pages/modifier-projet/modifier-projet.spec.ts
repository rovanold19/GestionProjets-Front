import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProjet } from './modifier-projet';

describe('ModifierProjet', () => {
  let component: ModifierProjet;
  let fixture: ComponentFixture<ModifierProjet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierProjet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierProjet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
