import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {map, shareReplay, tap} from 'rxjs/operators';

import {UserModel} from './auth.model';
import {W3AuthAbstractService} from './auth-abstract.service';
import {W3StorageService} from '../storage';

import {environment} from '../../../../environments/environment';
import {W3MeService} from './me.service';

@Injectable()
export class W3AuthService extends W3AuthAbstractService {

    constructor(http: HttpClient, storage: W3StorageService, me: W3MeService) {
        super(http, storage, me);
    }

    getUrlRefreshToken(): string {
        return `${environment.URL_API}/rapi/guardian/auth/refresh`;
    }

    login(email: string, password: string): Observable<UserModel | any> {
        return this.http
            .post(`${environment.URL_API}/rapi/guardian/auth/login`, {email, password})
            .pipe(
                tap(res => this.setSession(res)),
                // map(() => {
                //     return {id: 1, name: 'admin'};
                // }),
                shareReplay() // mytodo verificar se o shareReplay pode ser usado MAP junto
            );
    }

    remind(data): Observable<any> {
        return this.http
            .post(`${environment.URL_API}/rapi/guardian/auth/password/remind`, data)
            .pipe(
                map((resp) => {
                    console.log('resp', resp);
                    return resp;
                }),
            );
    }

    reset(data): Observable<any> {
        return this.http
            .post(`${environment.URL_API}/rapi/guardian/auth/password/reset`, data)
            .pipe(
                map((resp) => {
                    console.log('resp', resp);
                    return resp;
                }),
            );
    }

    register(data): Observable<any> {
        return this.http
            .post(`${environment.URL_API}/rapi/guardian/auth/sign-up`, data)
            .pipe(
                map((resp) => {
                    console.log('resp', resp);
                    return resp;
                }),
            );
    }
}
