import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {W3AuthService} from './auth.service';
import {W3AuthInterceptor} from './auth.Interceptor';
import {W3PublicGuard} from './guards/public.guard';
import {W3ProtectedGuard} from './guards/protected.guard';
import {W3_AUTH_SERVICE, W3_PROTECTED_FALLBACK_PAGE_URI, W3_PUBLIC_FALLBACK_PAGE_URI} from './tokens';


@NgModule({
    providers: [
        // W3AuthService,
        W3PublicGuard,
        W3ProtectedGuard,
        W3AuthInterceptor,
        // {
        //     provide: W3_AUTH_SERVICE,
        //     useClass: W3AuthService
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: W3AuthInterceptor,
            multi: true,
        },
        {
            provide: W3_PROTECTED_FALLBACK_PAGE_URI,
            useValue: '/'
        },
        {
            provide: W3_PUBLIC_FALLBACK_PAGE_URI,
            useValue: '/auth/login'
        },
    ]
})
export class W3AuthModule {
}
