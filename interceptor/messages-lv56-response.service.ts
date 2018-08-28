import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import {MessagesResponse} from './messages-response';
import {W3MessagesBaseResponseService} from './messages-base-response.service';

/**
 * https://github.com/scttcper/ngx-toastr
 */

@Injectable()
export class W3MessagesLv56ResponseService extends W3MessagesBaseResponseService implements MessagesResponse {

    constructor(_toast: ToastrService) {
        super(_toast);
    }

    respondNotFound(data): void {
        if (data.status === 'error' && data.message) {
            this._toast.error(data.message);
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

        this._toast.error(error, data.message);
    }

    /**
     * // Usuario não possui essa permissão CAM/ROLE
     * @param data
     */
    respondPermissionRequired(data): void {
        const msg = (data.error && data.message)
            ? data.message
            : 'Seu usuário não possui acesso!';

        this._toast.warning(msg);
    }

    respondUnauthorized(data): void {
        const msg = (data.error && data.message)
            ? data.message
            : 'Favor efetuar login!';

        this._toast.info(msg);
    }

    respondError(data): void {
        if (data.error && data.message) {
            this._toast.error(data.message);
        } else {
            this.respondInternalError(data);
        }
    }

}
