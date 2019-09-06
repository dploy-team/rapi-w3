import { UserModel } from "../auth.model";
import * as AuthActions from "./auth.actions";
import { createReducer, on } from "@ngrx/store";

export interface AuthState {
  me: UserModel;
  perms: any[];
  currentSession: any;
  loading: boolean;
  sessions: any[];
}

export const initialState: AuthState = {
  me: null,
  perms: [],
  currentSession: null,
  loading: false,
  sessions: []
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.FindMe, (state, action) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(AuthActions.FindMeSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      me: action.me
    };
  }),

  on(AuthActions.UpdateMe, (state, action) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(AuthActions.UpdateMeSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      me: action.me
    };
  }),

  on(AuthActions.LoadSessionsSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      sessions: action.sessions
    };
  }),

  on(AuthActions.SelectSessionSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      currentSession: action.session
    };
  })
);
