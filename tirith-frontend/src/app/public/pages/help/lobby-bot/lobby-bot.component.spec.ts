import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyBotComponent } from './lobby-bot.component';

describe('DiscordComponent', () => {
  let component: LobbyBotComponent;
  let fixture: ComponentFixture<LobbyBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyBotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
