import { AppState } from "../root.reducer";

export const isAuthenticationLoadingSelector = (state: AppState) => state.authentication.isLoading;
export const isAuthenticatedSelector = (state: AppState) => state.authentication.user !== undefined;

export const userSelector = (state: AppState) => state.authentication.user;