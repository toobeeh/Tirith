import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly baseUrl = "http://108.61.190.186:3000/admin";

  constructor(private http: HttpClient) { }

  getReports() {
    return this.http.get<any>(this.baseUrl + "/reports");
  }
}
