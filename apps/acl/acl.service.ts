import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataAclModel} from './acl.model';
import * as _ from 'lodash';

@Injectable()
export class W3AclService {

    public onChange$: Observable<DataAclModel>;

    private _dataInit = {
        roles: [],
        perms: []
    };
    private _data = new BehaviorSubject<DataAclModel>(this._dataInit);

    constructor() {
        this.onChange$ = this._data.asObservable();
    }

    setData(data: DataAclModel): void {
        this._data.next(data);
    }

    allRoles(): string[] {
        return this._data.value.roles;
    }

    allPerms(): string[] {
        return this._data.value.perms;
    }

    can(perms: string | string[], requireAll = false): boolean {

        if (typeof perms === 'string') {
            perms = [perms];
        }

        return this.check(perms, this.allPerms(), requireAll);
    }

    hasRole(roles: string | string[], requireAll = false): boolean {

        if (typeof roles === 'string') {
            roles = [roles];
        }

        return this.check(roles, this.allRoles(), requireAll);
    }

    private check(find: string[], data: string[], requireAll = false): boolean {
        const result = _.intersection(data, find);
        const min = requireAll ? find.length : 1;

        return result.length >= min;
    }

    reset(): void {
        this._data.next(this._dataInit);
    }
}
