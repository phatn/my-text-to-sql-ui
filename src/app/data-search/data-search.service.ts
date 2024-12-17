import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Data} from "./search.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataSearchService {

  constructor(private http: HttpClient) { }
  
  search(query: string): Observable<Data> {
    let item = "";
    if(Array.isArray(query) && query.length > 0) {
        item = query[0];
    } else {
      item = query;
    }
    const body = {query: query};
    return this.http.post<Data>(`${environment.apiUrl}/search`, {query: item});
  }

  suggest(keyword: any): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/suggestion?word=${keyword}`);
  }
}
