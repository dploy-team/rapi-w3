import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const getAuthState = createFeatureSelector<AuthState>("auth");

export const getCurrentUser = createSelector(
  getAuthState,
  (state: AuthState) => state.me
);

export const getCurrentAcl = createSelector(getAuthState, (state: AuthState) =>
  state.me ? state.me.acl : null
);

export const getCurrentSession = createSelector(
  getAuthState,
  (state: AuthState) => state.currentSession
);

export const getSessions = createSelector(
  getAuthState,
  (state: AuthState) => state.sessions
);

export const getAditionalData = createSelector(
  getAuthState,
  (state: AuthState) => state.aditionalData
);
