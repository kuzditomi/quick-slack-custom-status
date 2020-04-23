import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from "./root.reducer";

export function configureStore() {
    const middlewares = [thunkMiddleware];
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

    return store;
}
