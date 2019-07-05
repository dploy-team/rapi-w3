import { Inject, Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { MessagesResponse } from "./messages-response";
import { W3_MESSAGE_RESPONSE } from "..";

/**
 * Interceptor que mostra um Toast com as mensagens de erro/sucesso em cada requisição
 * As mensagens podem ser sobreescritas definindo um valor diferent para `W3_MESSAGE_RESPONSE` nos providers. e.g
 *
 *    export class MyMessagesService extends W3MessagesBaseResponseService {}
 *
 *    //MyModule#providers
 *    {W3_MESSAGE_RESPONSE, useClass: MyMessagesService}
 */
@Injectable()
export class W3ApiToastInterceptor implements HttpInterceptor {
  constructor(@Inject(W3_MESSAGE_RESPONSE) private _msg: MessagesResponse) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.has("skipToast")) {
      const headers = request.headers.delete("skipToast");
      const directRequest = request.clone({ headers });
      return next.handle(directRequest);
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => this.responseSuccess(event)),
      catchError((res: HttpErrorResponse) => this.responseError(request, res))
    );
  }

  private responseSuccess(event: HttpEvent<any>): void {
    if (event instanceof HttpResponse) {
      this._msg.respondOk(event.body);
    }
  }

  /**
   * Failed request interceptor, check if it has to be processed with refresh
   */
  private responseError(
    req: HttpRequest<any>,
    err: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
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

    return throwError(err);
  }
}
