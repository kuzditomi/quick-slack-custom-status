import { connect } from 'react-redux';
import { AppState } from '../root.reducer';
import { UserBadgeComponent, UserBadgeStateProps, UserBadgeDispatchProps } from './UserBadge.component';
import { userSelector } from '../auth/authentication.selectors';
import { Dispatch } from 'redux';
import { authenticationService } from '../auth/authentication.service';
import { logoutAction } from '../auth/authentication.actions';

const mapStateToProps = (state: AppState): UserBadgeStateProps => ({
    user: userSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): UserBadgeDispatchProps => ({
    logout: async () => {
        await authenticationService.logout();
        dispatch(logoutAction());
    }
});

export default connect<UserBadgeStateProps, UserBadgeDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(UserBadgeComponent);
