import { Component, OnDestroy } from '@angular/core';
import { AdminService, mappedLobby } from '../../services/lobbies.service';
import { Observable, map } from 'rxjs';
import { PastDrops } from 'palantir-db/dist/src/schema';

@Component({
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.css']
})
export class LobbiesComponent implements OnDestroy {
  lobbies: mappedLobby[] = [];
  interval: any;

  lobbyInspect?: mappedLobby;
  lobbyDrops$?: Observable<PastDrops[]>;

  constructor(public service: AdminService) {
    this.service.getLobbies().subscribe(l => {
      this.lobbies = l
    });

    this.interval = setInterval(() => {
      this.service.getLobbies().subscribe(l => {
        this.lobbies = l
      });
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  lobbyPlayers(lobby: mappedLobby) {
    return lobby.report.Players.map(p => p.Name).join(", ");
  }

  inspectLobby(lobby: mappedLobby) {
    this.lobbyInspect = lobby;
    this.lobbyDrops$ = this.service.getLobbyDrops(lobby.lobby.Key);
  }

  wrapDropsInObject(drops: PastDrops[] | null) {
    return { drops: drops };
  }
}
