import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as ptrTypes from "palantir-db/dist/src/types";
import * as ptrSchema from "palantir-db/dist/src/schema";

export interface mappedLobby {
  players: {
    name: string;
    login: string;
    username: string;
  }[];
  lobby: ptrTypes.palantirLobby;
  report: ptrTypes.reportLobby;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly baseUrl = environment.apiUrl + "/lobbies";

  constructor(private http: HttpClient) { }

  getReports() {
    return this.http.get<any>(this.baseUrl + "/reports");
  }

  getLobbies() {
    return this.http.get<mappedLobby[]>(this.baseUrl);
  }

  getLobbyDrops(key: string) {
    return this.http.get<ptrSchema.PastDrops[]>(this.baseUrl + "/" + key + "/drops");
  }
}
