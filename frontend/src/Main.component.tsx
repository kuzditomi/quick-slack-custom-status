import React from 'react';
import { User } from './auth/authentication.models';
import { StatusListComponent } from './status/StatusList.component';

export interface MainStateProps {
    user?: User;
}

export interface MainDispatchProps {
    logout(): void;
}

export const MainComponent: React.FC<MainStateProps & MainDispatchProps> = ({ user, logout }) => {
    if (!user) {
        return <p>Something went wrong :(</p>;
    }

    const renderAuthorizationButton = () => {
        const navigate = () => {
            window.location.href = '/api/auth/link';
        };

        return (
            <button onClick={() => navigate()}>
                <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" />
            </button >
        );
    };

    const renderStatuses = () => (
        <div>
            <p>Using workspace <b>{user.workspaceName}</b>.</p>
            <StatusListComponent />
        </div>
    );


    return (
        <div>
            hello {user.name}!

            {
                user.workspaceName ? renderStatuses() : renderAuthorizationButton()
            }
            <button onClick={() => { logout(); }}>Log out </button>
        </div>
    );
};
