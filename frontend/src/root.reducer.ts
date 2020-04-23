import { combineReducers } from "redux";
import { authenticationReducer } from "./auth/authentication.reducer";
import { statusReducer } from './status/status.reducer';

export const rootReducer = combineReducers({
    authentication: authenticationReducer,
    statuses: statusReducer
});

export type AppState = ReturnType<typeof rootReducer>;
