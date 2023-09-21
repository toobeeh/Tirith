import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DropDto, LobbiesResponseDto, LobbiesService } from 'src/api';

@Component({
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.css']
})
export class LobbiesComponent implements OnDestroy {
  lobbies: LobbiesResponseDto[] = [];
  interval: any;

  lobbyInspect?: LobbiesResponseDto;
  lobbyDrops$?: Observable<DropDto[]>;

  constructor(public lobbiesService: LobbiesService) {
    this.lobbiesService.getAllLobbies().subscribe(l => {
      this.lobbies = l
    });

    this.interval = setInterval(() => {
      this.lobbiesService.getAllLobbies().subscribe(l => {
        this.lobbies = l
      });
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  lobbyPlayers(lobby: LobbiesResponseDto) {
    return lobby.details.Players.map(p => p.Name).join(", ");
  }

  inspectLobby(lobby: LobbiesResponseDto) {
    this.lobbyInspect = lobby;
    this.lobbyDrops$ = this.lobbiesService.getLobbyDrops(lobby.lobby.Key);
  }

  wrapDropsInObject(drops: DropDto[] | null) {
    return { drops: drops };
  }
}
