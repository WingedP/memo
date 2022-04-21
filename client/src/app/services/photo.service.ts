import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends HttpService {

  constructor(
    public httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  public async capturePhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 60
    });

    return {
      filepath: '',
      webviewPath: `data:image/jpeg;base64,${capturedPhoto.base64String}`
    };
  }

  public uploadPhotoToStorage(body: FormData, url: string): Observable<any> {
    return this.post(url, body);
  }

}
