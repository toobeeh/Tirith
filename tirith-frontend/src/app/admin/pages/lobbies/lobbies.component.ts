import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {DropDto, LobbiesService, LobbyPlayerDto, OnlineLobbyDto} from 'src/api';

@Component({
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.css']
})
export class LobbiesComponent implements OnDestroy {
  lobbies: OnlineLobbyDto[] = [];
  interval: any;

  lobbyInspect?: OnlineLobbyDto;
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

  playerIsTypoUser(lobby: OnlineLobbyDto, player: LobbyPlayerDto){
    return lobby.typoPlayers.some(typoplayer => typoplayer.lobbyPlayerID == player.lobbyPlayerId);
  }

  findPlayerNameById(lobby: OnlineLobbyDto, id: number){
    return lobby.skribblDetails.players.find(player => player.lobbyPlayerId == id)?.name ?? "Unknown";
  }

  inspectLobby(lobby: OnlineLobbyDto) {
    this.lobbyInspect = lobby;
    this.lobbyDrops$ = this.lobbiesService.getLobbyDrops(lobby.skribblDetails.id);
  }

  wrapDropsInObject(drops: DropDto[] | null) {
    return { drops: drops };
  }
}
