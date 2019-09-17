import { createAction, props } from "@ngrx/store";
import { UserModel } from "../auth.model";

export const FindMe = createAction("[Auth] Find Me", props<{}>());

export const FindMeSuccess = createAction(
  "[Auth] Find Me success",
  props<{ me: UserModel }>()
);

export const login = createAction(
  "[Auth] Login",
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction("[Auth] Login success", props<{}>());

export const Logout = createAction(
  "[Auth] Logout",

  props<{}>()
);

export const UpdateMe = createAction(
  "[Auth] Update me",

  props<{ me: UserModel[] }>()
);

export const UpdateMeSuccess = createAction(
  "[Auth] Update me success",

  props<{ me: UserModel }>()
);

export const ChangeMyLang = createAction(
  "[Auth] Change my lang",
  props<{ lang: string }>()
);

export const ChangeMyLangSuccess = createAction(
  "[Auth] Change my lang Success",

  props<{ me: UserModel }>()
);

export const LoadSessions = createAction(
  "[Auth] Load Sessions",

  props<{}>()
);

export const LoadSessionsSuccess = createAction(
  "[Auth] Load Sessions Success",

  props<{ sessions: any[] }>()
);

export const SelectSession = createAction(
  "[Auth] Select session",

  props<{ session: any }>()
);

export const SelectSessionSuccess = createAction(
  "[Auth] Select session success",

  props<{ session: any }>()
);
