import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public previousUrl: string = undefined;
  public currentUrl: string = undefined;

  constructor(
    public httpClient: HttpClient,
  ) {
    // empty
  }

  get<t>(url: string, options?): Observable<any> {
    let requestOption = this.createAuthorizationHeader();
    Object.assign(requestOption, options);
    return this.httpClient.get(url, requestOption);
  }

  post<t>(url: string, data): Observable<any> {
    let requestOption = this.createAuthorizationHeader();
    return this.httpClient.post(url, data, requestOption);
  }

  put<t>(url: string, data): Observable<any> {
    let requestOption = this.createAuthorizationHeader();
    return this.httpClient.put(url, data, requestOption);
  }

  patch<t>(url: string, data): Observable<any> {
    let requestOption = this.createAuthorizationHeader();
    return this.httpClient.patch(url, data, requestOption);
  }

  delete<t>(url: string): Observable<any> {
    let requestOption = this.createAuthorizationHeader();
    return this.httpClient.delete(url, requestOption);
  }

  get tokenGameServer() {
    return localStorage.getItem('tokenGameServer');
  }

  set tokenGameServer(token) {
    localStorage.setItem('tokenGameServer', token);
  }

  get tokenUser() {
    return localStorage.getItem('tokenUser');
  }

  set tokenUser(token) {
    localStorage.setItem('tokenUser', token);
  }

  public createAuthorizationHeader() {
    let headers = new HttpHeaders({});
    return { headers: headers };
  }

}
