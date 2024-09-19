import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmojisComponent } from './add-emojis.component';

describe('AddEmojisComponent', () => {
  let component: AddEmojisComponent;
  let fixture: ComponentFixture<AddEmojisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmojisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmojisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
