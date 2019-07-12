import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "@env/environment";
import { UserModel } from "./auth.model";
import { ItemRespDec, ItemResponse } from "../../responses/responses.model";

/**
 * Service de controle do usuário logado
 */
@Injectable()
export class W3MeService {
  /**
   * Observable emitido em caso de mudança no usuário logado
   */
  public onChange$: Observable<UserModel>;

  /**
   * Behavior subject do usuário logado
   */
  private _user = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient) {
    this.onChange$ = this._user.asObservable();
  }

  /**
   * Emite um novo evento em `_user` com o valor informado
   * @param user
   */
  public setUser(user: UserModel): void {
    return this._user.next(user);
  }

  /**
   * Usuário logado
   */
  getUser(): UserModel {
    return this._user.value;
  }

  /**
   * Faz o subscribe na consulta de current user
   */
  refresh(params?): void {
    this.me(params).subscribe();
  }

  /**
   * Emite um valor `null` no _user
   */
  clear(): void {
    this._user.next(null);
  }

  /**
   * Consulta pelo usuário logado
   * @param params
   */
  me(params?): Observable<UserModel> {
    return this.http
      .get<ItemRespDec<UserModel>>(`${environment.URL_API}/rapi/guardian/me`, {
        params: params
      })
      .pipe(
        map(res => res.data),
        tap(user => this.setUser(user))
      );
  }

  /**
   * Atualiza os dados do usuário logado
   * @param data Usuário logado
   */
  update(data): Observable<UserModel> {
    return this.http
      .put<ItemResponse>(`${environment.URL_API}/rapi/guardian/me`, data)
      .pipe(
        map(res => res.data),
        tap(user => this.setUser(user))
      );
  }
}
