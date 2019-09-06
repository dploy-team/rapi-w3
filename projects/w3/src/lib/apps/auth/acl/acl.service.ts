import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DataAclModel } from "./acl.model";
import * as _ from "lodash";

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

  getData(): DataAclModel {
    return this._data.value;
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

  can(perms: string[], requireAll?: boolean): boolean {
    return this.check(perms, this.allPerms(), requireAll);
  }

  hasRole(roles: string[], requireAll?: boolean): boolean {
    return this.check(roles, this.allRoles(), requireAll);
  }

  private check(find: string[], data: string[], requireAll?: boolean): boolean {
    if (!find || find.length == 0) return true;
    const result = find.filter(value => data.includes(value));
    if (requireAll) {
      return result.length === data.length;
    }

    return result.length > 0;
  }

  reset(): void {
    this._data.next(this._dataInit);
  }
}
