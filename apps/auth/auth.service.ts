import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {W3AuthAbstractService} from './auth-abstract.service';
import {User} from './auth.model';
import {of} from 'rxjs/internal/observable/of';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment';

@Injectable()
export class W3AuthService implements W3AuthAbstractService {

    constructor(private http: HttpClient) {
    }

    getAccessToken(): Observable<string> {
        const accessToken: string = localStorage.getItem('access_token');

        return of(accessToken);
    }

    getHeaders(token: string): { [p: string]: string | string[] } {
        return {
            Authorization: `Bearer ${token}`,
            'X-Pdv': '1',
            // 'X-Project': '1'
        };
    }

    isAuthorized(): Observable<boolean> {
        // const isAuthorized = this.isLoggedIn();
        const isAuthorized: boolean = !!localStorage.getItem('access_token');

        return of(isAuthorized);
    }

    refreshShouldHappen(response: HttpErrorResponse): boolean {
        console.log('refreshShouldHappen', response);
        // mytodo quando der erro tratar aqui
        return response.status === 401 && localStorage.getItem('access_token') !== null;
    }

    refreshToken(): Observable<any> {
        const refreshToken: string = localStorage.getItem('access_token');
        const options = {
            headers: {Authorization: `Bearer ${refreshToken}`},
        };

        console.log('refreshToken');

        return this.http
            .post(`${environment.URL_API}/rapi/guardian/auth/refresh`, null, options)
            .pipe(
                tap(res => this.setSession(res)),
                catchError((err) => {
                    this.logout();
                    return err;
                })
            );
    }

    verifyTokenRequest(url: string): boolean {
        return url.endsWith('auth/refresh');
    }

    login(email: string, password: string): Observable<User | any> {

        return this.http
            .post(`${environment.URL_API}/rapi/guardian/auth/login`, {email, password})
            .pipe(
                tap(res => this.setSession(res)),
                map(() => {
                    return {id: 1, name: 'admin'};
                }),
                shareReplay() // mytodo verificar se o shareReplay pode ser usado MAP junto
            );
    }

    private setSession(authResult): void {
        console.log('setSession', authResult);
        const expiresAt = moment().add(authResult.data.expires_in, 'second');

        localStorage.setItem('access_token', authResult.data.access_token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
    }

    isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    getExpiration(): moment.Moment {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

}
