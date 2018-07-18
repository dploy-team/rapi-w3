import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import * as moment from 'moment';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

/**
 * Essential service for authentication
 * @export
 */
export abstract class W3AuthAbstractService {

    protected _headers = {};

    protected constructor(protected http: HttpClient) {
    }

    // `${environment.URL_API}/rapi/guardian/auth/refresh`
    public abstract getUrlRefreshToken(): string;

    /**
     * Check, if user already authorized.
     *
     * Should return Observable with true or false values
     */
    public isAuthorized(): Observable<boolean> {
        // const isAuthorized = this.isLoggedIn();
        const isAuthorized: boolean = !!localStorage.getItem('access_token');
        return of(isAuthorized);
    }

    /**
     * Get access token
     *
     * Should return access token in Observable from e.g.
     * localStorage
     */
    public getAccessToken(): Observable<string> {
        const accessToken: string = localStorage.getItem('access_token');
        return of(accessToken);
    }

    /**
     * Function, that should perform refresh token verifyTokenRequest
     *
     * Should be successfully completed so interceptor
     * can execute pending requests or retry original one
     */
    public refreshToken(): Observable<any> {
        const refreshToken: string = localStorage.getItem('access_token');
        const options = {
            headers: {Authorization: `Bearer ${refreshToken}`},
        };

        console.log('refreshToken');

        return this.http
            .post(this.getUrlRefreshToken(), null, options)
            .pipe(
                tap(res => this.setSession(res)),
                catchError((err) => {
                    this.logout();
                    return err;
                })
            );
    }

    /**
     * Function, checks response of failed request to determine,
     * whether token be refreshed or not.
     *
     * Essentially checks status
     */
    public refreshShouldHappen(response: HttpErrorResponse): boolean {
        console.log('refreshShouldHappen', response);
        // mytodo quando der erro tratar aqui
        return response.status === 401 && localStorage.getItem('access_token') !== null;
    }

    /**
     * Verify that outgoing request is refresh-token,
     * so interceptor won't intercept this request
     */
    public verifyTokenRequest(url: string): boolean {
        return url.endsWith('auth/refresh');
    }

    protected setSession(authResult): void {
        console.log('setSession', authResult);
        const expiresAt = moment().add(authResult.data.expires_in, 'second');

        localStorage.setItem('access_token', authResult.data.access_token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    public logout(): any {

        const refreshToken: string = localStorage.getItem('access_token');
        const options = {
            headers: {Authorization: `Bearer ${refreshToken}`},
        };
        return this.http
            .post(`${environment.URL_API}/rapi/guardian/auth/token/revoke`, null, options)
            .pipe(
                map((resp) => {
                    console.log('resp', resp);

                    localStorage.removeItem('access_token');
                    localStorage.removeItem('expires_at');

                    return resp;
                }),

            );
    }

    public isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    public isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    public getExpiration(): moment.Moment {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    /**
     * Add token to headers, dependent on server
     * set-up, by default adds a bearer token.
     * Called by interceptor.
     *
     * To change behavior, override this method.
     */
    public getHeaders(token: string): { [p: string]: string | string[] } {
        this._headers['Authorization'] = `Bearer ${token}`;
        return this._headers;
    }

    public addHeader(key, value): void {
        this._headers[key] = value;
        console.log('addHeader', this._headers);
    }
}
