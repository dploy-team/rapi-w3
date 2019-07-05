import { Injectable, Inject } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Router
} from "@angular/router";

import { Observable } from "rxjs";
import { W3AclService } from "../acl.service";
import { W3NotificationService } from "../../notification/notifications.service";
import { W3AuthAbstractService } from "../../auth/auth-abstract.service";
import { W3_AUTH_SERVICE } from "../../auth/tokens";

/**
 * Guarda de rotas para ACL.
 * Verifica as permissões do usuário logado para liberar ou não acesso à rota
 *
 * Para usar deve-se passar o array de permissões nos dados das rotas
 *
 * @example
 * export const routes: Routes = [
 *               {path: 'foo', component: BarComponent, data: {perms: ['data.access']} }
 * ]
 *
 *
 *
 */
@Injectable()
export class W3AclCanGuard implements CanActivate, CanActivateChild {
  constructor(
    private _acl: W3AclService,
    private _notification: W3NotificationService,
    private router: Router,
    @Inject(W3_AUTH_SERVICE) private authService: W3AuthAbstractService
  ) {}

  /**
   *
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!next.data.perms) {
      this._notification.error(
        "Permissão não intendificada! Informar no router. Não foi encontrado o data.perms => url: " +
          next.url
      );
      return false;
    }

    if (!this._acl.can(next.data.perms)) {
      this._notification.warning(
        "Seu usuário não possui acesso a esta permissão: " + next.data.perms
      );
      if (next.data.redirectUrl && this.authService.isLoggedIn()) {
        this.router.navigate([next.data.redirectUrl]);
      }
      return false;
    }

    return true;
  }

  /**
   * CanActivateChild handler
   */
  public canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
