import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';

import {Observable} from 'rxjs';
import {W3AclService} from '../acl.service';
import {W3NotificationService} from '../../../services/notifications.service';

@Injectable()
export class W3AclCanGuard implements CanActivate, CanActivateChild {

    constructor(
        private _acl: W3AclService,
        private _notification: W3NotificationService) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!next.data.perms) {
            this._notification.error('Permissão não intendificada! Informar no router. => ' + next.url);
            return false;
        }

        if (!this._acl.can(next.data.perms)) {
            this._notification.warning('Seu usuário não possui acesso a esta permissão: ' + next.data.perms);
            return false;
        }

        return true;
    }

    /**
     * CanActivateChild handler
     */
    public canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(next, state);
    }

}
