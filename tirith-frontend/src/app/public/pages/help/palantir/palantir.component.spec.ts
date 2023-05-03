import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalantirComponent } from './palantir.component';

describe('PalantirComponent', () => {
  let component: PalantirComponent;
  let fixture: ComponentFixture<PalantirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalantirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalantirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
