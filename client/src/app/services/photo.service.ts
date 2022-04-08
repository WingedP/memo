import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];

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
    this.photos = [photo];
    this.addPhotoActionSrc.next(photo);
    return;
  }

}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}


// import { Injectable } from '@angular/core';
// import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
// import { Capacitor } from '@capacitor/core';
// import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Storage } from '@capacitor/storage';
// import { Platform } from '@ionic/angular';
// import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PhotoService {
//   public photos: UserPhoto[] = [];
//   private PHOTO_STORAGE: string = 'photos';
//   private platform: Platform;

//   private addPhotoActionSrc = new Subject<any>();
//   addPhotoAction$ = this.addPhotoActionSrc.asObservable();

//   constructor(platform: Platform) {
//     this.platform = platform;
//   }

//   public async loadSaved() {
//     const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
//     this.photos = JSON.parse(photoList.value) || [];

//     if (!this.platform.is('hybrid')) {
//       for (let photo of this.photos) {
//         const readFile = await Filesystem.readFile({
//           path: photo.filepath,
//           directory: Directory.Data
//         });

//         photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
//       }
//       this.addPhotoActionSrc.next(this.photos[0]);
//     }
//   }

//   public async addNewToGallery() {
//     // take a photo
//     const capturedPhoto = await Camera.getPhoto({
//       resultType: CameraResultType.Uri,
//       source: CameraSource.Camera,
//       quality: 70
//     });

//     // Save the picture and add it to photo collection
//     const savedImageFile = await this.savePicture(capturedPhoto);
//     this.photos.unshift(savedImageFile);

//     Storage.set({
//       key: this.PHOTO_STORAGE,
//       value: JSON.stringify(this.photos),
//     });

//     this.loadSaved();
//   }

//   private async savePicture(photo: Photo) { // save pic on device
//     // Convert photo to base64 format, required by Filesystem API to save
//     const base64Data = await this.readAsBase64(photo);

//     // Write the file to the data directory
//     const fileName = new Date().getTime() + '.jpeg';
//     const savedFile = await Filesystem.writeFile({
//       path: fileName,
//       data: base64Data,
//       directory: Directory.Data
//     });

//     if (this.platform.is('hybrid')) {
//       // Display the new image by rewriting the 'file://' path to HTTP
//       // Details: https://ionicframework.com/docs/building/webview#file-protocol
//       return {
//         filepath: savedFile.uri,
//         webviewPath: Capacitor.convertFileSrc(savedFile.uri),
//       };
//     }
//     else {
//       return {
//         filepath: fileName,
//         webviewPath: photo.webPath
//       };
//     }
//   }

//   private async readAsBase64(photo: Photo) {
//     // "hybrid" will detect Cordova or Capacitor
//     if (this.platform.is('hybrid')) {
//       // Read the file into base64 format
//       const file = await Filesystem.readFile({
//         path: photo.path
//       });

//       return file.data;
//     }
//     else {
//       // Fetch the photo, read as a blob, then convert to base64 format
//       const response = await fetch(photo.webPath);
//       const blob = await response.blob();

//       return await this.convertBlobToBase64(blob) as string;
//     }
//   }

//   private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onerror = reject;
//     reader.onload = () => {
//       resolve(reader.result);
//     };
//     reader.readAsDataURL(blob);
//   });
// }

// export interface UserPhoto {
//   filepath: string;
//   webviewPath: string;
// }

// // private async savePicture(photo: Photo) {
// //   const base64Data = await this.readAsBase64(photo);

// //   const fileName = new Date().getTime() + '.jpeg';
// //   const savedFile = await Filesystem.writeFile({
// //     path: fileName,
// //     data: base64Data,
// //     directory: Directory.Data
// //   });

// //   return {
// //     filepath: fileName,
// //     webviewPath: photo.webPath
// //   };
// // }

// // public async loadSaved() {

// //   const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
// //   this.photos = JSON.parse(photoList.value) || [];

// //   for (let photo of this.photos) {
// //     const readFile = await Filesystem.readFile({
// //       path: photo.filepath,
// //       directory: Directory.Data,
// //     });

// //     photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
// //   }
// //   console.log('loadsaved', this.photos);
// //   this.addPhotoActionSrc.next(this.photos[0]);
// // }
