import React from 'react';
import './App.scss';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';
import PrivateRoute from './auth/PrivateRoute.container';
import { useEffect } from 'react';
import { authenticationService } from './auth/authentication.service';
import { authenticationLoadingAction, authenticationErrorAction, authenticationSuccessAction } from './auth/authentication.actions';
import { LoginComponent } from './auth/Login.component';
import Main from './Main.container';

export const App: React.FC = () => {
  const store = configureStore();

  useEffect(() => {
    store.dispatch(authenticationLoadingAction());

    authenticationService.getUser()
      .then((user) => {
        store.dispatch(authenticationSuccessAction(user));
      })
      .catch(() => {
        store.dispatch(authenticationErrorAction());
      });
  });

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <header>
            <h1>Quick slack status updates</h1>
          </header>
          <main>
            <Switch>
              <Route path="/login" exact={true}>
                <LoginComponent/>
              </Route>
              <PrivateRoute path="/" exact={true} >
                <Main/>
              </PrivateRoute>
            </Switch>
          </main>
        </Router>
      </div>
    </Provider>
  );
};
