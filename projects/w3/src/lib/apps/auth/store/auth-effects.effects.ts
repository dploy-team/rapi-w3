import { Injectable, Injector } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, concatMap } from "rxjs/operators";
import { W3AuthAbstractService } from "../auth-abstract.service";
import { W3AuthService } from "../auth.service";
import { W3MeService } from "../me.service";
import { W3_AUTH_SERVICE } from "../tokens";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthEffectsEffects {
  private api: W3AuthAbstractService;

  constructor(
    private actions$: Actions,
    // private injector: Injector,
    private meService: W3MeService,
    private authService: W3AuthService
  ) {
    // this.api = this.injector.get<W3AuthAbstractService>(W3_AUTH_SERVICE);

    actions$.subscribe(res => console.log(res));
  }

  findMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.FindMe),
      switchMap(action => {
        return this.meService
          .me({ include: "acl" })
          .pipe(map(data => AuthActions.FindMeSuccess({ me: data })));
      })
    )
  );

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.Login),
      concatMap(action => {
        return this.authService.login(action.email, action.password).pipe(
          map(data => {
            // this.api.setSession(data);
            return AuthActions.FindMeSuccess({ me: {} as any });
          })
        );
      })
    );
  });
}
