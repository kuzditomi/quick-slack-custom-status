import { connect } from 'react-redux';
import { AppState } from '../root.reducer';
import { isAuthenticatedSelector } from '../auth/authentication.selectors';
import { Header, HeaderStateProps } from './Header.component';

const mapStateToProps = (state: AppState): HeaderStateProps => ({
    isLoggedIn: isAuthenticatedSelector(state),
});


export default connect<HeaderStateProps, {}, {}, AppState>(
    mapStateToProps
)(Header);
