import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';

import { PostsService } from '@services/posts.service';

export class ProviderClass {
    public static readonly Router = Router.name;
    public static readonly PostsService = PostsService.name;
}

export const MOCK_PROVIDERS: Array<any> = [
    MockProvider(Router),
    MockProvider(PostsService),
];
