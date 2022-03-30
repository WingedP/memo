import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public avatarPlaceholder = 'assets/icon/user_ava/ava_1.svg';
  public postPlaceholder1 = 'assets/icon/trend_slide/turtle.svg';
  public postPlaceholder2 = 'assets/icon/trend_slide/pudding.JPG';
  public diaryPostPH = 'assets/icon/diary/posts_list/pic_holder.svg';

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

  post<t>(url, data): Observable<any>{
    let requestOption = this.createAuthorizationHeader()
    return this.httpClient.post(url, data, requestOption)
  }

  put<t>(url, data): Observable<any>{
    let requestOption = this.createAuthorizationHeader()
    return this.httpClient.put(url, data, requestOption)
  }

  patch<t>(url, data): Observable<any>{
    let requestOption = this.createAuthorizationHeader()
    return this.httpClient.patch(url, data, requestOption)
  }

  delete<t>(url): Observable<any>{
    let requestOption = this.createAuthorizationHeader()
    return this.httpClient.delete(url, requestOption)
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
    let headers = new HttpHeaders({
      'X-GAMER': this.tokenUser || ''
    });
    return { headers: headers }
  }

  public list(params: any) {
    let url = `${environment.baseUrl}/${params}`;
    return this.get(url);
  }
}
