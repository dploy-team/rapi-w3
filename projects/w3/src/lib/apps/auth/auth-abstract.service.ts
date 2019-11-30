import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs";
import { of } from "rxjs/internal/observable/of";
import { catchError, map, tap } from "rxjs/operators";

//https://www.monkeyuser.com/2018/code-reuse/
import * as momentImported from "moment";
const moment = momentImported;

import { environment } from "@env/environment";
import { W3StorageService } from "../storage/storage.service";
import { W3MeService } from "./me.service";
import { UserModel } from "./auth.model";

/**
 * Essential service for authentication
 *
 */
export abstract class W3AuthAbstractService {
  /**
   * Headers for auth request's
   */
  protected _headers = {};

  /**
   *
   * @param http Angular common HttpClientModule
   * @param storage Service de Storage do W3
   * @param me Service de controlo do usuário logado do W3
   */
  protected constructor(
    protected http: HttpClient,
    protected storage: W3StorageService,
    protected me: W3MeService
  ) {}

  public abstract login(
    email: string,
    password: string
  ): Observable<UserModel | any>;

  /**
   * Url de refresh token (deve ser sobreescrita), e.g `.../rapi/guardian/auth/refresh`
   */
  public abstract getUrlRefreshToken(): string;

  /**
   * Url para expirar o token
   */
  public getUrlRevokeToken(): string {
    return `${environment.URL_API}/rapi/guardian/auth/logout`;
  }

  public getLogoutUrl() {
    return "/auth/login";
  }
  /**
   * Check, if user already authorized.
   *
   * Should return Observable with true or false values
   */
  public isAuthorized(): Observable<boolean> {
    // const isAuthorized = this.isLoggedIn();
    const isAuthorized: boolean = !!this.storage.get("access_token");
    return of(isAuthorized);
  }

  /**
   * Get access token
   *
   * Should return access token in Observable from e.g.
   * localStorage
   */
  public getAccessToken(): Observable<string> {
    const accessToken: string = this.storage.get("access_token");
    return of(accessToken);
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   *
   * Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   */
  public refreshToken(): Observable<any> {
    const refreshToken: string = this.storage.get("access_token");
    const options = {
      headers: { Authorization: `Bearer ${refreshToken}` }
    };

    return this.http.post(this.getUrlRefreshToken(), null, options).pipe(
      tap(res => this.setSession(res)),
      catchError(err => {
        this.forceLogout();
        return err;
      })
    );
  }

  public forceLogout(): void {
    this.clearToken();
    window.location.href = this.getLogoutUrl();
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   *
   * Essentially checks status
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    console.log("refreshShouldHappen", response);
    return response.status === 401 && this.storage.get("access_token") !== null;
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith("auth/refresh");
  }

  /**
   * Seta na sessão do navegador dados de auth e.g token, expires_at....
   * @param authResult Result do login
   */
  public setSession(authResult): void {
    const expiresAt = moment().add(authResult.data.expires_in, "second");

    this.storage.set("access_token", authResult.data.access_token);
    this.storage.set("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  /**
   * Método 'Esqueci minha senha' (deve ser sobreescrito)
   * @param data
   */
  public remind(data: any): Observable<any> {
    return of(null);
  }

  /**
   * Método 'Recuperar senha' (deve ser sobreescrito)
   * @param data
   */
  public reset(data: any): Observable<any> {
    return of(null);
  }

  /**
   * Método que realiza o logout e limpa a sessão
   */
  public logout(): Observable<any> {
    const refreshToken: string = this.storage.get("access_token");
    const options = {
      headers: { Authorization: `Bearer ${refreshToken}` }
    };

    return this.http.post(this.getUrlRevokeToken(), null, options).pipe(
      map(resp => {
        this.me.clear();
        this.clearToken();
        return resp;
      })
    );
  }

  /**
   * Método que remove os dados da sessão
   */
  public clearToken(): void {
    this.storage.remove("access_token");
    this.storage.remove("expires_at");
  }

  /**
   * Verifica se o usuário está logado
   */
  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  /**
   * Verifica se o usuário está logado
   * @see isLoggedIn
   */
  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  /**
   * Recupera o time de expiração do token
   */
  public getExpiration(): any {
    const expiration = this.storage.get("expires_at");
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
    this._headers["Authorization"] = `Bearer ${token}`;
    return this._headers;
  }

  /**
   *
   * @param key nome do header. e.g `Content-Type`
   * @param value valor do header. e.g `application/json`
   */
  public addHeader(key, value): void {
    if (value === null || value === "") {
      delete this._headers[key];
    } else {
      this._headers[key] = value;
    }
  }

  public abstract getSessions(params?): Observable<any[]>;
}
