import {Inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {MessagesResponse} from './messages-response';
import {W3_MESSAGE_RESPONSE} from '@rapi/w3';

@Injectable()
export class W3ApiToastInterceptor implements HttpInterceptor {

    constructor(@Inject(W3_MESSAGE_RESPONSE) private _msg: MessagesResponse) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.headers.has('skipToast')) {
            const headers = request.headers.delete('skipToast');
            const directRequest = request.clone({ headers });
            return next.handle(directRequest);
        }

        return next.handle(request)
            .pipe(
                tap((event: HttpEvent<any>) => this.responseSuccess(event)),
                catchError((res: HttpErrorResponse) => this.responseError(request, res))
            );
    }

    private responseSuccess(event: HttpEvent<any>): void {

        // responseLoading(response);
        // responseMensage(response.data);

        if (event instanceof HttpResponse) {
            // do stuff with response if you want
            this._msg.respondOk(event.body);
            console.log('responseSuccess', event);
        }

    }

    /**
     * Failed request interceptor, check if it has to be processed with refresh
     */
    private responseError(
        req: HttpRequest<any>,
        err: HttpErrorResponse
    ): Observable<HttpEvent<any>> {

        // responseLoading(rejection);

        if (!navigator.onLine) {
            // Handle offline error
            this._msg.respondOffline();
        }

        if (err.status === 400) {
            // Erro de validacao
            this._msg.respondValidation(err.error);
        } else if (err.status === 403) {
            // Usuario não possui essa permissão CAM/ROLE
            this._msg.respondPermissionRequired(err.error);
            // $rootScope.$emit('w3HttpInterceptor:permissionRequired', err);
        } else if (err.status === 404) {
            // Não encontrado
            // $rootScope.$emit('w3HttpInterceptor:notFound', err);
            this._msg.respondNotFound(err.error);
        } else if (err.status === 401) {
            // User não autorizado | User não logado
            this._msg.respondUnauthorized(err.error);
            // checkLoginRequired(err);
        } else if (err.status === -1) {
            //    request canceled
        } else if (err.status === 0) {
            this._msg.respondInternalError(err.error);
        } else if (err.status) {
            this._msg.respondError(err.error);
        }

        console.log('response in the catch: ', err);

        return throwError(err);
    }


    /**
     * Verifica o retorno da requisição e alta os status de loadingProgress
     * @param response is response|rejection
     */
    // function responseLoading(response)
    // {
    //     if (response.config && 'w3Reload' in response.config) {
    //         delete $rootScope.w3Reload[ response.config.w3Reload ];
    //     }
    //
    //     //Caso a URL seja de uma api ele para reload
    //     if (response.config && response.config.url.indexOf(config.urlPrefix) !== -1) {
    //         $rootScope.loadingProgress = false;
    //     }
    // }


}
