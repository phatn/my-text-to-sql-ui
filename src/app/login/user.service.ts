import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { environment } from '../../environments/environment';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log(`${environment.apiUrl}`)
  }

  updateData(newData: any) {
    this.dataSubject.next(newData);
  }

  login(email: string, password: string) {
    return this.http.post<{token:string}>(`${environment.apiUrl}/users/login`, { email, password});
  }


  handleLogin(email: string, password: string) {
    return this.http.post<{success:boolean, fullname: string}>(`http://localhost:8000/login`, { email, password});
  }

  signup(formData: FormData) {
    return this.http.post<{token:string}>(`${environment.apiUrl}/users`, formData);
  }

  persistToken(token: string) {
    localStorage.setItem("TOKEN", token);
  }

  clearToken() {
    localStorage.clear();
  }

}
