import React from 'react';

export const LoginComponent: React.FC = () => {
    const login = () => {
        window.location.href = '/api/auth/signin';
    };

    return (
        <div>
            <button onClick={() => { login(); }}>Authenticate with Slack</button>
        </div>
    );
};
