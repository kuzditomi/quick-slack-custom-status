import { actionCreator } from '../actions';
import { User } from './authentication.models';

export enum AuthActionTypes {
    AUTHENTICATION_LOADING = 'auth/load',
    AUTHENTICATION_SUCCESS = 'auth/success',
    AUTHENTICATION_ERROR = 'auth/error',
    LOGOUT = 'auth/logout',
}

export const authenticationLoadingAction = actionCreator<AuthActionTypes.AUTHENTICATION_LOADING, void>(AuthActionTypes.AUTHENTICATION_LOADING);
export const authenticationSuccessAction = actionCreator<AuthActionTypes.AUTHENTICATION_SUCCESS, User>(AuthActionTypes.AUTHENTICATION_SUCCESS);
export const authenticationErrorAction = actionCreator<AuthActionTypes.AUTHENTICATION_ERROR, void>(AuthActionTypes.AUTHENTICATION_ERROR);
export const logoutAction = actionCreator<AuthActionTypes.LOGOUT, void>(AuthActionTypes.LOGOUT);

export type AuthActions = ReturnType<typeof authenticationLoadingAction> |
    ReturnType<typeof authenticationSuccessAction> |
    ReturnType<typeof authenticationErrorAction> |
    ReturnType<typeof logoutAction>;