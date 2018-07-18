import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import {MessagesResponse} from './messages-response';
import {W3MessagesBaseResponseService} from './messages-base-response.service';

/**
 * https://github.com/scttcper/ngx-toastr
 */

@Injectable()
export class W3MessagesLv55ResponseService extends W3MessagesBaseResponseService implements MessagesResponse {

    constructor(_toast: ToastrService) {
        super(_toast);
    }

    respondNotFound(data): void {
        if (data.status === 'error' && data.error.message) {
            this._toast.error(data.error.message);
        }
    }

    respondValidation(data): void {

        if (!data.error) {
            return;
        }

        let error = '';

        if (data.error.validation) {
            error = '<ul>';

            _.forEach(data.error.validation, (msg: string) => {
                error += '<li>' + msg + '</li>';
            });

            error += '</ul>';
        }

        this._toast.error(error, data.error.message);
    }

    /**
     * // Usuario não possui essa permissão CAM/ROLE
     * @param data
     */
    respondPermissionRequired(data): void {
        const msg = (data.error && data.error.message)
            ? data.error.message
            : 'Seu usuário não possui acesso!';

        this._toast.warning(msg);
    }

    respondUnauthorized(data): void {
        const msg = (data.error && data.error.message)
            ? data.error.message
            : 'Favor efetuar login!';

        this._toast.info(msg);
    }

    respondError(data): void {
        if (data.error && data.error.message) {
            this._toast.error(data.error.message);
        } else {
            this.respondInternalError(data);
        }
    }

}
