import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { W3AuthInterceptor } from "./auth.Interceptor";
import { W3AuthService } from "./auth.service";
import { W3ProtectedGuard } from "./guards/protected.guard";
import { W3PublicGuard } from "./guards/public.guard";
import { W3MeService } from "./me.service";
import {
  W3_PROTECTED_FALLBACK_PAGE_URI,
  W3_PUBLIC_FALLBACK_PAGE_URI
} from "./tokens";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./store/auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffectsEffects } from "./store/auth.effects";

/**
 * ## Módulo de autenticação do W3
 *
 *
 * #Configurações extras:
 *
 * ### Service de autenticação, caso não informado será usado o {@link W3AuthService}
 * `{W3_AUTH_SERVICE: useClass: MyCustomAuthService}`
 *
 * ### Rota protegida de fallback
 * Rota padrão caso um usuário logado tente acessar uma routa protegida pelo {@link W3PublicGuard}. e.g:
 *
 * `{provide: W3_PROTECTED_FALLBACK_PAGE_URI, useValue: '/painel'}`
 *
 * ### Rota pública de fallback
 * Rota padrão caso um usuário logado tente acessar uma routa protegida pelo {@link W3ProtectedGuard}. e.g:
 *
 * `{provide: W3_PUBLIC_FALLBACK_PAGE_URI, useValue: '/auth/login'},`
 */
@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature("auth", fromAuth.reducer),
    EffectsModule.forFeature([AuthEffectsEffects])
  ],
  providers: [
    W3PublicGuard,
    W3ProtectedGuard,
    W3AuthInterceptor,
    W3AuthService,

    W3MeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: W3AuthInterceptor,
      multi: true
    },
    {
      provide: W3_PROTECTED_FALLBACK_PAGE_URI,
      useValue: "/"
    },
    {
      provide: W3_PUBLIC_FALLBACK_PAGE_URI,
      useValue: "/auth/login"
    }
  ]
})
export class W3AuthModule {}
