import React from 'react';
import { User } from './auth/authentication.models';
import StatusList from './status/StatusList.container';
import StatusAdder from './status/StatusAdder.container';
import { Typography, Button } from '@material-ui/core';
import { IntroComponent } from './Intro.component';

export interface MainStateProps {
    user?: User;
}

export interface MainDispatchProps {
    loadStatuses(): void;
    logout(): void;
}

export const MainComponent: React.FC<MainStateProps & MainDispatchProps> = ({ user, logout, loadStatuses }) => {
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

    const renderStatuses = () => {
        loadStatuses();
        return (
            <>
                <IntroComponent />
                <Typography className="welcome">Let's do some status updates using workspace <b>{user.workspaceName}</b>!</Typography>
                <StatusList />
                <StatusAdder />
            </>
        );
    };


    return (
        <div>
            <Typography component="h1" variant="h6">
                Hello {user.name},
            </Typography>
            {
                user.workspaceName ? renderStatuses() : renderAuthorizationButton()
            }

            <Button style={{ marginTop: 5 }} fullWidth={true} color="primary" variant="outlined"
                onClick={() => { logout(); }}>Log out</Button>
        </div>
    );
};
