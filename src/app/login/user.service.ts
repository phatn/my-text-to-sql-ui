import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import { environment } from '../../environments/environment';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataSubject = new BehaviorSubject<any>(this.getData());
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log(`${environment.apiUrl}`)
  }

  getData() {
    return localStorage.getItem("TOKEN_NAME");
  }

  updateData(newData: any) {
    this.dataSubject.next(newData);
  }

  login(email: string, password: string) {
    return this.http.post<{success:boolean, fullname: string}>(`${environment.apiUrl}/login`, { email, password});
  }

  clearToken() {
    localStorage.clear();
  }

}
