import { MainComponent, MainStateProps, MainDispatchProps } from './Main.component';
import { userSelector } from './auth/authentication.selectors';
import { AppState } from './root.reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authenticationService } from './auth/authentication.service';
import { logoutAction } from './auth/authentication.actions';

const mapStateToProps = (state: AppState): MainStateProps => ({
    user: userSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): MainDispatchProps => ({
    logout: async () => {
        await authenticationService.logout();

        dispatch(logoutAction());
    }
});

export default connect<MainStateProps, MainDispatchProps, {}, AppState>(
    mapStateToProps, mapDispatchToProps
)(MainComponent);