import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import * as moment from 'moment';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {W3StorageService} from '../storage';

/**
 * Essential service for authentication
 * @export
 */
export abstract class W3AuthAbstractService {

    protected _headers = {};

    protected constructor(protected http: HttpClient, protected storage: W3StorageService) {
    }

    // `${environment.URL_API}/rapi/guardian/auth/refresh`
    public abstract getUrlRefreshToken(): string;

    getUrlRevokeToken(): string {
        return `${environment.URL_API}/rapi/guardian/auth/logout`;
    }

    /**
     * Check, if user already authorized.
     *
     * Should return Observable with true or false values
     */
    public isAuthorized(): Observable<boolean> {
        // const isAuthorized = this.isLoggedIn();
        const isAuthorized: boolean = !!this.storage.get('access_token');
        return of(isAuthorized);
    }

    /**
     * Get access token
     *
     * Should return access token in Observable from e.g.
     * localStorage
     */
    public getAccessToken(): Observable<string> {
        const accessToken: string = this.storage.get('access_token');
        return of(accessToken);
    }

    /**
     * Function, that should perform refresh token verifyTokenRequest
     *
     * Should be successfully completed so interceptor
     * can execute pending requests or retry original one
     */
    public refreshToken(): Observable<any> {
        const refreshToken: string = this.storage.get('access_token');
        const options = {
            headers: {Authorization: `Bearer ${refreshToken}`},
        };
        this.storage.remove('access_token');
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
        return response.status === 401 && this.storage.get('access_token') !== null;
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

        this.storage.set('access_token', authResult.data.access_token);
        this.storage.set('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    public logout(): any {

        const refreshToken: string = this.storage.get('access_token');
        const options = {
            headers: {Authorization: `Bearer ${refreshToken}`},
        };
        return this.http
            .post(this.getUrlRevokeToken(), null, options)
            .pipe(
                map((resp) => {
                    console.log('resp', resp);

                    this.storage.remove('access_token');
                    this.storage.remove('expires_at');

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
        const expiration = this.storage.get('expires_at');
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
    }
}
