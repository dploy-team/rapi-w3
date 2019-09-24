import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";
import { AuthState } from "../store/auth.reducer";
import { getCurrentAcl } from "../store/auth.selectors";
import { DataAclModel } from "./acl.model";

@Injectable()
export class W3AclService {
  private _dataInit = {
    roles: [],
    perms: []
  };
  private _data = new BehaviorSubject<DataAclModel>(this._dataInit);

  constructor(private store: Store<AuthState>) {
    store.select(getCurrentAcl).subscribe(acl => {
      if (acl)
        this.setData({
          roles: acl.roles,
          perms: acl.permissions.map(permission => permission.name)
        });
    });
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
