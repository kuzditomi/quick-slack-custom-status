import { combineReducers } from "redux";
import { authenticationReducer } from "./auth/authentication.reducer";

export const rootReducer = combineReducers({
    authentication: authenticationReducer
});

export type AppState = ReturnType<typeof rootReducer>;
