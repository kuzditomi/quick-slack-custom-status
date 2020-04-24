import React from 'react';
import { Button } from '@material-ui/core';

export const LoginComponent: React.FC = () => {
    const login = () => {
        window.location.href = '/api/auth/signin';
    };

    return (
        <div>
            <Button color="primary" variant="contained" onClick={() => { login(); }}>Authenticate with Slack</Button>
        </div>
    );
};
