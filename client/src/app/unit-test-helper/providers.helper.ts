import { uniq } from 'lodash';

import { MOCK_PROVIDERS, ProviderClass } from './providers.mock';

/**
 * @description produce a completed service providers from input service classes (array)
 */
export function getMockProviders(providers: any[][], _specName?: string): any[] {
    if (!providers || providers.length === 0) {
        return;
    }

    // eslint-disable-next-line prefer-spread
    const injectionList = [].concat.apply([], providers);
    const uniqueInjectionList = uniq(injectionList);

    return MOCK_PROVIDERS.filter(provider => {
        return uniqueInjectionList.includes(provider.provide.name);
    });
}

export const PostsStateProviders: Array<string> = [
    ProviderClass.PostsService,
    ProviderClass.Router,
];

