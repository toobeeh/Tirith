import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPalantirComponent } from './new-palantir.component';

describe('DiscordComponent', () => {
  let component: NewPalantirComponent;
  let fixture: ComponentFixture<NewPalantirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPalantirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPalantirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
