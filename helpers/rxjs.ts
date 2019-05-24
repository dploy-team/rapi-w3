import {filter, map} from 'rxjs/operators';
import {defer} from 'rxjs';

export interface W3ConfirmResponse<T = any> {
    result: string;
    payload?: T;
}

export const w3IsConfirmed = () => {
    return source => defer(() => {

        return source.pipe(
            filter((response: W3ConfirmResponse) => response.result === 'OK'),
            map((response: W3ConfirmResponse) => response.payload)
        );

    });
};
