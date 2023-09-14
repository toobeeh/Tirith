import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as ptrSchema from "palantir-db/dist/src/schema";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseUrl = environment.apiUrl + "/auth";

  constructor(private http: HttpClient) { }

  getAccessToken(authCode: string): Observable<{ accessToken: string, user: any }> {

    const params = new HttpParams()
      .set('code', authCode);

    return this.http.get<any>(this.baseUrl + "/token", { params });
  }

  createNewMember(authCode: string, connectTypo: boolean): Observable<{ accessToken: string, user: any, member: ptrSchema.Members }> {
    return this.http.post<any>(this.baseUrl + "/register", { code: authCode, connectTypo });
  }
}
