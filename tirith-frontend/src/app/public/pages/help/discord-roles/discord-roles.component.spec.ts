import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordRolesComponent } from './discord-roles.component';

describe('DiscordComponent', () => {
  let component: DiscordRolesComponent;
  let fixture: ComponentFixture<DiscordRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscordRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscordRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
