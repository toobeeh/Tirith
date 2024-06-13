import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalantirTosComponent } from './palantir-tos.component';

describe('PrivacyComponent', () => {
  let component: PalantirTosComponent;
  let fixture: ComponentFixture<PalantirTosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalantirTosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalantirTosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
