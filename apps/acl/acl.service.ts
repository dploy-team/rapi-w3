import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataAclModel} from './acl.model';
import * as _ from 'lodash';

@Injectable()
export class W3AclService {

    private _t;
    public onChange$: Observable<DataAclModel>;

    private _dataInit = {
        roles: [],
        perms: []
    };
    private _data = new BehaviorSubject<DataAclModel>(this._dataInit);

    constructor() {
        this._t = Math.random();
        console.log('ACL.constructor', this._t);
        this.onChange$ = this._data.asObservable();
    }

    getData(): DataAclModel {
        return this._data.value;
    }

    setData(data: DataAclModel): void {
        console.log('ACL.setData', data, this._t);
        this._data.next(data);
    }

    allRoles(): string[] {
        return this._data.value.roles;
    }

    allPerms(): string[] {
        return this._data.value.perms;
    }

    can(perms: string | string[], requireAll ?: boolean): boolean {
        console.log('ACL.findCan', perms, this.allPerms(), this._t);
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
        const result = _.intersection( find, data);
        const min = requireAll ? find.length : 1;

        return result.length >= min;
    }

    reset(): void {
        this._data.next(this._dataInit);
    }
}
