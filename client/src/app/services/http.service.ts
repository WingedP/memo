import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
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

  post<t>(url, data): Observable<any> {
    let requestOption = this.createAuthorizationHeader();
    return this.httpClient.post(url, data, requestOption);
  }

  put<t>(url, data): Observable<any> {
    let requestOption = this.createAuthorizationHeader();
    return this.httpClient.put(url, data, requestOption);
  }

  patch<t>(url, data): Observable<any> {
    let requestOption = this.createAuthorizationHeader();
    return this.httpClient.patch(url, data, requestOption);
  }

  delete<t>(url): Observable<any> {
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

  public list(params: any) {
    let url = `${environment.baseUrl}/${params}`;
    return this.get(url);
  }
}
