import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {W3AuthService} from './auth.service';
import {W3AuthInterceptor} from './auth.Interceptor';
import {W3PublicGuard} from './guards/public.guard';
import {W3ProtectedGuard} from './guards/protected.guard';
import {W3_AUTH_SERVICE} from './tokens';


@NgModule({
    providers: [
        W3AuthService,
        W3PublicGuard,
        W3ProtectedGuard,
        W3AuthInterceptor,
        {
            provide: W3_AUTH_SERVICE,
            useClass: W3AuthService
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: W3AuthInterceptor,
            multi: true,
        }
    ]
})
export class W3AuthModule {
}
