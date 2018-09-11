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
        console.log('ACL.setData', data);
        this._data.next(data);
    }

    allRoles(): string[] {
        return this._data.value.roles;
    }

    allPerms(): string[] {
        return this._data.value.perms;
    }

    can(perms: string | string[], requireAll ?: boolean): boolean {
        return this.check(perms, this.allPerms(), requireAll);
    }

    hasRole(roles: string | string[], requireAll ?: boolean): boolean {
        return this.check(roles, this.allRoles(), requireAll);
    }

    private check(find: string | string[], data: string[], requireAll ?: boolean): boolean {

        if (typeof find === 'string') {

            if (typeof requireAll === 'undefined') {
                requireAll = find.includes(',');
            }

            find = find.split(/[\|,\,]/);
        }

        const result = _.intersection(data, find);
        const min = requireAll ? find.length : 1;

        return result.length >= min;
    }

    reset(): void {
        this._data.next(this._dataInit);
    }
}
