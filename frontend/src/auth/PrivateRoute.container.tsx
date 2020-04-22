import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../root.reducer';
import { isAuthenticatedSelector, isAuthenticationLoadingSelector } from './authentication.selectors';

interface PrivateRouteStateProps {
    isAuthenticationLoading: boolean;
    isAuthenticated: boolean;
}

const PrivateRouteComponent: React.FC<PrivateRouteStateProps & RouteProps> = ({ isAuthenticated, isAuthenticationLoading, ...rest }) => {
    if (isAuthenticationLoading) {
        return (<p> Loading ... </p>);
    }

    if (isAuthenticated) {
        return (<Route {...rest} />);
    }

    return (
        <Redirect to='/login' />
    );
};

const mapStateToProps = (state: AppState): PrivateRouteStateProps => ({
    isAuthenticationLoading: isAuthenticationLoadingSelector(state),
    isAuthenticated: isAuthenticatedSelector(state)
});

export default connect<PrivateRouteStateProps, {}, RouteProps, AppState>(
    mapStateToProps
)(PrivateRouteComponent);