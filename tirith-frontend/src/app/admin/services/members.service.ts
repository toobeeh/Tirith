import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  readonly baseUrl = environment.apiUrl + "/members";

  constructor(private http: HttpClient) { }

  getLobinByDiscordID(id: string) {
    return this.http.get<number>(this.baseUrl + "/discord/" + id);
  }

  getMemberByLogin(login: number) {
    return this.http.get<any>(this.baseUrl + "/" + login);
  }

  updateDiscordID(login: number, newID: string) {
    return this.http.patch<any>(this.baseUrl + "/" + login + "/discord", { id: newID });
  }

  searchMembers(content: string) {
    const params = new HttpParams()
      .set('content', content);
    return this.http.get<any[]>(this.baseUrl + "/search", { params }).pipe(
      map(
        data => data.map(member => ({ login: member.Login, member }))
      )
    );
  }
}
