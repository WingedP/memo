import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';

import { PostsService } from '@services/posts.service';
import { ModalController } from '@ionic/angular';
import { ModalControllerMock } from './modal-controller.mock';

export class ProviderClass {
  public static readonly Router = Router.name;
  public static readonly PostsService = PostsService.name;
}

export const MOCK_PROVIDERS: Array<any> = [
  {
    provide: ModalController,
    useClass: ModalControllerMock
  },
  MockProvider(Router),
  MockProvider(PostsService),
];
