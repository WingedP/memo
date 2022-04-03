import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends HttpService {

  constructor(
    public httpClient: HttpClient
  ) {
    super(httpClient);
  }

  public getPosts(data?): Observable<any> {
    return this.get(`${environment.baseUrl}/posts`, { params: data });
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

  public reorderPost(data) {
    return this.post(`${environment.baseUrl}/posts/reorder`, data);
  }

  public group3Elements(array, n) {
    return [...Array(Math.ceil(array.length / n))].map((el, i) => array.slice(i * n, (i + 1) * n));
  }

}
