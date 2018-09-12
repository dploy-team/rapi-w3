import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ItemRespDec, ItemResponse} from '@rapi/w3';
import {UserModel} from '@rapi/w3/apps/auth/auth.model';

import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable()
export class W3MeService {

    public onChange$: Observable<UserModel>;
    private _user = new BehaviorSubject<UserModel>(null);

    constructor(private http: HttpClient) {
        this.onChange$ = this._user.asObservable();
    }

    setUser(user: UserModel): void {
        return this._user.next(user);
    }

    getUser(): UserModel {
        return this._user.value;
    }

    refresh(): void {
        this.me().subscribe();
    }

    clear(): void {
        this._user.next(null);
    }

    me(params?): Observable<UserModel> {
        return this.http
            .get<ItemRespDec<UserModel>>(`${environment.URL_API}/rapi/guardian/me`, {'params': params})
            .pipe(
                map(res => res.data),
                tap(user => this.setUser(user))
            );
    }

    update(data): Observable<UserModel> {
        return this.http
            .put<ItemResponse>(`${environment.URL_API}/rapi/guardian/me`, data)
            .pipe(
                map(res => res.data),
                tap(user => this.setUser(user))
            );
    }

}
