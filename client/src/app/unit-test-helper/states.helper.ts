import { StateClass } from '@ngxs/store/internals';

import { getMockStatesDataSource } from './states.mock';

interface MockState<T> {
    [state: string]: T;
}

/**
 * @description produce a completed state data (object) from given state classes (array)
 */
export function createMockStateData(states: Array<StateClass>): MockState<any> {
    if (!states || states.length === 0) {
        return;
    }

    const mockStatesData = getMockStatesDataSource();
    const mockStates = mockStatesData.filter(item => states.includes(item.state));

    const obj = <MockState<any>>{};
    mockStates.forEach((item: any) => {
        obj[item.state.name] = item.payload;
    });

    return obj;
}
