import {Injectable, Inject} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {W3_AUTH_SERVICE, W3_PROTECTED_FALLBACK_PAGE_URI} from '../tokens';
import {W3AuthAbstractService} from '../auth-abstract.service';

/**
 * Guard, checks access token availability and allows or disallows access to page,
 * and redirects out
 *
 * usage: { path: 'test', component: TestComponent, canActivate: [ W3PublicGuard ] }
 *
 * @export
 */
@Injectable()
export class W3PublicGuard implements CanActivate, CanActivateChild {

    constructor(
        @Inject(W3_AUTH_SERVICE) private authService: W3AuthAbstractService,
        @Inject(W3_PROTECTED_FALLBACK_PAGE_URI) private protectedFallbackPageUri: string,
        private router: Router
    ) {
    }

    /**
     * CanActivate handler
     */
    public canActivate(
        _route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        return this.authService
            .isAuthorized()
            .pipe(map((isAuthorized: boolean) => {
                if (isAuthorized && !this.isProtectedPage(state)) {
                    this.navigate(this.protectedFallbackPageUri);
                    console.log('Url only guest->', state.url);
                    return false;
                }

                return true;
            }));
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
     * Check, if current page is protected fallback page
     */
    private isProtectedPage(state: RouterStateSnapshot): boolean {
        return state.url === this.protectedFallbackPageUri;
    }

    /**
     * Navigate away from the app / path
     */
    private navigate(url: string): void {
        if (url.startsWith('http')) {
            window.location.href = url;
        } else {
            this.router.navigateByUrl(url);
        }
    }

}
