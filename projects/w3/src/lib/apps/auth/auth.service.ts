import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { map, shareReplay, tap } from "rxjs/operators";

import { UserModel } from "./auth.model";
import { W3AuthAbstractService } from "./auth-abstract.service";
import { W3StorageService } from "../storage/storage.service";

import { environment } from "@env/environment";
import { W3MeService } from "./me.service";
import { of } from "rxjs";

/**
 * Serviço padrão de autenticação
 */
@Injectable()
export class W3AuthService extends W3AuthAbstractService {
  constructor(http: HttpClient, storage: W3StorageService, me: W3MeService) {
    super(http, storage, me);
  }

  getUrlRefreshToken(): string {
    return `${environment.URL_API}/rapi/guardian/auth/refresh`;
  }

  /**
   * Serviço de login
   * @param email
   * @param password
   */
  login(email: string, password: string): Observable<UserModel | any> {
    console.log("asd");
    return this.http.post(`${environment.URL_API}/rapi/guardian/auth/login`, {
      email,
      password
    });
  }

  /**
   * Serviço de recuperação de senha
   */
  remind(data): Observable<any> {
    return this.http
      .post(`${environment.URL_API}/rapi/guardian/auth/password/remind`, data)
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  /**
   * Serviço de alteração de senha
   */
  reset(data): Observable<any> {
    return this.http
      .post(`${environment.URL_API}/rapi/guardian/auth/password/reset`, data)
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  /**
   * Service de sign-up
   */
  register(data): Observable<any> {
    return this.http
      .post(`${environment.URL_API}/rapi/guardian/auth/sign-up`, data)
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  getSessions() {
    return of([]);
  }
}
