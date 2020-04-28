import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';
import PrivateRoute from './auth/PrivateRoute.container';
import { useEffect } from 'react';
import { authenticationService } from './auth/authentication.service';
import { authenticationLoadingAction, authenticationErrorAction, authenticationSuccessAction } from './auth/authentication.actions';
import { LoginComponent } from './auth/Login.component';
import Main from './Main.container';
import AppThemeComponent from './AppTheme.component';
import { CssBaseline, Paper, Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';
import HeaderComponent from './Header.component';
import 'intro.js/introjs.css';
import './styles.css';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      position: "relative"
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto"
    },
  });


const AppComponent: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
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
    <AppThemeComponent>
      <Provider store={store}>
        <div className="App">
          <CssBaseline />
          <Router>
            <HeaderComponent />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Paper className={classes.paper}>
                <Switch>
                  <Route path="/login" exact={true}>
                    <LoginComponent />
                  </Route>
                  <PrivateRoute path="/" exact={true} >
                    <Main />
                  </PrivateRoute>
                </Switch>
              </Paper>
            </main>
          </Router>
        </div>
      </Provider>
    </AppThemeComponent >
  );
};

export const App = withStyles(styles)(AppComponent);