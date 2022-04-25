import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends BaseService {

  constructor(
    public httpClient: HttpClient
  ) {
    super(httpClient);
  }

  public getPosts(data?): Observable<any> {
    return this.get(`${environment.baseUrl}/posts`, { params: data });
  }

  public getPost(postID): Observable<any> {
    return this.get(`${environment.baseUrl}/posts/${postID}`);
  }

  public createPost(data) {
    return this.post(`${environment.baseUrl}/posts`, data);
  }

  public updatePost(data, postID) {
    return this.patch(`${environment.baseUrl}/posts/${postID}`, data);
  }

  public deletePost(postID) {
    return this.delete(`${environment.baseUrl}/posts/${postID}`);
  }

  public group3Elements(array, n) {
    return [...Array(Math.ceil(array.length / n))].map((el, i) => array.slice(i * n, (i + 1) * n));
  }

}
