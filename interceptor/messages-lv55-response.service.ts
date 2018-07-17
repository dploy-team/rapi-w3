import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import {MessagesResponse} from './messages-response';

/**
 * https://github.com/scttcper/ngx-toastr
 */

@Injectable()
export class W3MessagesLv55ResponseService implements MessagesResponse {

    constructor(private _toast: ToastrService) {
    }

    respondOffline(): void {
        this._toast.warning('Sem conexão com a internet!');
    }

    respondOk(data): void {

        if (!data.message) {
            return;
        }

        switch (data.status) {
            case 'success':
                this._toast.success(data.message);
                break;
            case 'error':
                this._toast.error(data.message);
                break;
            default:
                this._toast.info(data.message);
        }

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

    respondInternalError(error): void {
        this._toast.error('Falha ao se comunicar com o servidor!');
    }
}
