import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private addPhotoActionSrc = new Subject<any>();
  addPhotoAction$ = this.addPhotoActionSrc.asObservable();

  constructor() {
    // empty
  }

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 70
    });

    const photo = {
      filepath: '',
      webviewPath: `data:image/jpeg;base64,${capturedPhoto.base64String}`
    };
    this.addPhotoActionSrc.next(photo);
    return;
  }

}
