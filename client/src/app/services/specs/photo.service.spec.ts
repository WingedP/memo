import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { BaseService } from "../base.service";
import { PhotoService } from "../photo.service";

import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

describe('PhotoService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let photoService: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [
          PhotoService,
          BaseService,
        ]
      }
    );

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    photoService = TestBed.inject(PhotoService);
  });

  it('photoService should be created', () => {
    expect(photoService).toBeTruthy();
  });

  it('should capture the photo (with webcam/phone\'s camera)', () => {

  });


  it('should send captured photo to storage', () => {

  });

});



// import { DataStatus, Document } from '@app/core/datatypes';
// import { PartnerDocumentService } from '@app/core/services';
// import { DocumentFileServiceMock, PartnerDocumentIntegrationserviceMock } from '@app/core/services/mocks';

// describe('PartnerDocumentService', () => {
//     let partnerDocumentService: PartnerDocumentService = null;
//     let partnerDocumentIntegrationService: PartnerDocumentIntegrationserviceMock = null;
//     let documentFileService: DocumentFileServiceMock = null;

//     beforeEach(() => {
//         documentFileService = new DocumentFileServiceMock();
//         partnerDocumentIntegrationService = new PartnerDocumentIntegrationserviceMock();
//         partnerDocumentService = new PartnerDocumentService(
//             partnerDocumentIntegrationService as any,
//             documentFileService as any
//         );
//     });

//     afterEach(() => {
//         documentFileService = null;
//         partnerDocumentIntegrationService = null;
//         partnerDocumentService = null;
//     });

//     describe('Get partner document metadata', () => {
//         it('should get partner document metadata successfully', (done) => {
//             partnerDocumentService.getPartnerDocumentMetaData('11752272').subscribe((data) => {
//                 expect(data.length).toBe(3);
//                 expect(data[0].downloadStatus).toBe('NotLoaded');
//                 expect(data[0].path).toBe('11752272/d56c8a04-928b-4c72-9199-d652c1bcba27.pdf');
//                 done();
//             });
//         });

//         it('should NOT get partner document metadata successfully', (done) => {
//             (
//                 partnerDocumentIntegrationService as PartnerDocumentIntegrationserviceMock
//             ).getPartnerDocumentMetaDataSucceeded = false;
//             partnerDocumentService.getPartnerDocumentMetaData('11752272').subscribe(
//                 () => {
//                     fail();
//                 },
//                 (err) => {
//                     expect(err.message).toBe('getPartnerDocumentMetaDataError');
//                     done();
//                 }
//             );
//         });
//     });

//     describe('Download partner documents', () => {
//         it('should download partner document file successfully', (done) => {
//             partnerDocumentService.getPartnerDocumentMetaData('11752272').subscribe(
//                 (data) => {
//                     expect(data[0].downloadStatus).toBe('NotLoaded');

//                     partnerDocumentService.downloadPartnerDocumentFile(data[0]).subscribe(
//                         (result) => {
//                             expect(result.downloadStatus).toBe('Loaded');
//                         },
//                         () => {
//                             fail();
//                         }
//                     );

//                     done();
//                 },
//                 () => {
//                     fail();
//                 }
//             );
//         });
//     });

//     it('should NOT download partner document successfully', (done) => {
//         (
//             partnerDocumentIntegrationService as PartnerDocumentIntegrationserviceMock
//         ).downloadPartnerDocumentFileSucceeded = false;

//         partnerDocumentService.getPartnerDocumentMetaData('11752272').subscribe(
//             (data) => {
//                 expect(data[0].downloadStatus).toBe('NotLoaded');

//                 partnerDocumentService.downloadPartnerDocumentFile(data[0]).subscribe(
//                     (result) => {
//                         expect(result.downloadStatus).toBe('Failed');
//                         done();
//                     },
//                     () => {
//                         fail();
//                     }
//                 );
//             },
//             () => {
//                 fail();
//             }
//         );
//     });

//     describe('Refresh partner documents', () => {
//         let documentsDownloaded: Document[];
//         beforeEach(() => {
//             documentsDownloaded = [
//                 <Document>{
//                     modificationDate: '2019-06-04 11:07:17',
//                     name: 'Amtliche Akten/Dokumente (Initial)',
//                     id: 'd56c8a04-928b-4c72-9199-d652c1bcba27',
//                     mimeType: 'application/pdf',
//                     title: 'Getting Started',
//                     path: '11752272/d56c8a04-928b-4c72-9199-d652c1bcba27.pdf',
//                     type: 'Partner Document',
//                     downloadStatus: DataStatus.Loaded
//                 }
//             ];
//         });

//         it('should refresh partner document successfully', (done) => {
//             partnerDocumentService.refreshPartnerDocuments(documentsDownloaded).subscribe(
//                 (data) => {
//                     expect(data.length).toBe(1);
//                     expect(data[0].downloadStatus).toBe('Loaded');
//                     done();
//                 },
//                 () => {
//                     fail();
//                 }
//             );
//         });

//         it('should fall back to LOADED status when failed to re-download document', (done) => {
//             (
//                 partnerDocumentIntegrationService as PartnerDocumentIntegrationserviceMock
//             ).downloadPartnerDocumentFileSucceeded = false;

//             partnerDocumentService.refreshPartnerDocuments(documentsDownloaded).subscribe(
//                 (data) => {
//                     expect(data.length).toBe(1);
//                     expect(data[0].downloadStatus).toEqual(DataStatus.Loaded);
//                     done();
//                 },
//                 () => {
//                     fail();
//                 }
//             );
//         });
//     });
// });
