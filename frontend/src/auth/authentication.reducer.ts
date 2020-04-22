import { AuthActions, AuthActionTypes } from './authentication.actions';
import { User } from './authentication.models';
export interface AuthState {
    isLoading: boolean;
    user?: User;
}

const initialState: AuthState = {
    isLoading: true,
    user: undefined
};

export const authenticationReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
    switch (action.type) {
        case AuthActionTypes.AUTHENTICATION_LOADING:
            return {
                ...state,
                isLoading: true,
                user: undefined
            };
        case AuthActionTypes.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            };
        case AuthActionTypes.AUTHENTICATION_ERROR:
            return {
                ...state,
                isLoading: false,
                user: undefined
            };
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                user: undefined
            };
        default:
            return state;
    }
};