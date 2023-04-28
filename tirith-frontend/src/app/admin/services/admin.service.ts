import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly baseUrl = environment.apiUrl + "/admin";

  constructor(private http: HttpClient) { }

  getReports() {
    return this.http.get<any>(this.baseUrl + "/reports");
  }
}
