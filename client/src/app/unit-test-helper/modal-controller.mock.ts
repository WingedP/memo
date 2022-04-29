import { ModalOptions } from '@ionic/core';
export declare class ModalControllerMock {
    isModalCreateCalled: boolean;
    isModalPresentCalled: boolean;
    isModalPresentSucceeded: boolean;
    isModalDismissCalled: boolean;
    isModalWillDismissCalled: boolean;
    isModalWillDismissReturnedData: boolean;
    opts: ModalOptions | undefined;
    customResponse: any;
    constructor();
    create(opts?: ModalOptions): Promise<HTMLIonModalElement>;
    dismiss(_data?: any, _role?: string, _id?: string): Promise<boolean>;
}
