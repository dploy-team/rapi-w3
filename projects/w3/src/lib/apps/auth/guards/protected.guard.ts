import { Injectable, Inject } from "@angular/core";
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { W3_AUTH_SERVICE, W3_PUBLIC_FALLBACK_PAGE_URI } from "../tokens";
import { W3AuthAbstractService } from "../auth-abstract.service";

/**
 * Guard, checks access token availability and allows or disallows access to page,
 * and redirects out
 *
 * @example
 * { path: 'test', component: TestComponent, canActivate: [ W3ProtectedGuard ] }
 *
 * @export
 */
@Injectable()
export class W3ProtectedGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(W3_AUTH_SERVICE) private authService: W3AuthAbstractService,
    @Inject(W3_PUBLIC_FALLBACK_PAGE_URI) private publicFallbackPageUri: string,
    private router: Router
  ) {}

  /**
   * CanActivate handler
   */
  public canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('ad');
    return this.authService.isAuthorized().pipe(
      map((isAuthorized: boolean) => {
        if (!isAuthorized && !this.isPublicPage(state)) {
          this.navigate(this.publicFallbackPageUri);
          console.log("Required Login->", state.url);
          return false;
        }

        return true;
      })
    );
  }

  /**
   * CanActivateChild handler
   */
  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }

  /**
   * Check, if current page is public fallback page
   */
  private isPublicPage(state: RouterStateSnapshot): boolean {
    return state.url === this.publicFallbackPageUri;
  }

  /**
   * Navigate away from the app / path
   */
  private navigate(url: string): void {
    if (url.startsWith("http")) {
      window.location.href = url;
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
