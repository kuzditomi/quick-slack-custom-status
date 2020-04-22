import React from 'react';
import './App.scss';
import Header from './header/Header.container';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';
import PrivateRoute from './auth/PrivateRoute.container';
import { useEffect } from 'react';
import { authenticationService } from './auth/authentication.service';
import { authenticationLoadingAction, authenticationErrorAction, authenticationSuccessAction } from './auth/authentication.actions';

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

  const login = ()=>{
    window.location.href = '/api/auth/signin';
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <main>
            <Switch>
              <Route path="/login" exact={true}>
                <button onClick={()=> login()}>Connect using slack</button>
              </Route>
              <PrivateRoute path="/company/:id" exact={true} >
                hello
              </PrivateRoute>
              <Route path="/" exact={true}>
                Home
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </Provider>
  );
};
