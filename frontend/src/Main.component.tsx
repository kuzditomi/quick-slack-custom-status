import React from 'react';
import { User } from './auth/authentication.models';

export interface MainStateProps {
    user?: User;
}

export interface MainDispatchProps {
    logout(): void;
}

export const MainComponent: React.FC<MainStateProps & MainDispatchProps> = ({user, logout }) => {
    if(!user){
        return <p>Something went wrong :(</p>;
    }

    return (
        <div>
            hello {user.name}!

            <button onClick={() => { logout(); }}>Log out </button>
        </div>
    );
};
